import { ControllerUtils } from "../utils/ControllerUtils";
import { LoginUserErrors, LoginUserErrResponse, LoginUserRequest, RefreshTokensRequest, RegisterUserErrors, RegisterUserErrResponse, RegisterUserRequest } from "@groupfitnessapp/common/src/api/requests/auth.types";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";
import db from "../models"
import { CallbackError, NativeError } from "mongoose";
import { IUser, IUserDocument } from "@groupfitnessapp/common/src/api/models/User.model";
import { JWTUtils } from "../utils/JWTUtils";
import { RouteController } from "./index";
import bcrypt from "bcrypt";
import { AuthUtils, EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { ClientErrorStatusCodes, ServerErrorStatusCodes } from "@groupfitnessapp/common/src/api/requests/statusCodes";
import { IUserDocSaveErr } from "models/User/UserMethods";

const SECRET = EnvUtils.getEnvVar(EnvVars.SECRET, "");

export const RegisterUserController: RouteController<RegisterUserRequest, {}> = async (req, res) => {
    const { email, fullName, password, passwordReEnter, phone, username } = req.body;

    // validate input from user
    const inputErr = AuthUtils.validateRegistrationFields({ email, fullName, password, passwordReEnter, phone, username })

    if (inputErr) {
        return ControllerUtils.respondWithErr<RegisterUserErrResponse>({
            status: ClientErrorStatusCodes.Unauthorized,
            data: { error: RegisterUserErrors.InvalidUserInput, errMsg: inputErr.msg, field: inputErr.field }
        }, res)
    }

    // hash that will be used to enforce that a refresh token is only used once
    const newTokenHash = await generateRandomHash();

    const user: Partial<IUser> = {
        ...req.body,
        jwtHash: newTokenHash
    }

    db.User.create(user, async (err: CallbackError | IUserDocSaveErr, user) => {
        if (err && !(err instanceof global.Error)) {
            return ControllerUtils.respondWithErr<RegisterUserErrResponse>({ status: ClientErrorStatusCodes.BadRequest, data: err }, res)
        } else if (err) {
            return ControllerUtils.respondWithUnexpectedErr(res);
        }

        const { accessToken, refreshToken } = await generateTokens(user, newTokenHash);

        if (!accessToken || !refreshToken) {
            // return 500 status if accessToken couldn't be created for some reason
            return ControllerUtils.respondWithErr<RegisterUserErrResponse>({ 
                status: ServerErrorStatusCodes.InternalServerError, 
                data: { error: RegisterUserErrors.UnexpectedCondition } 
            }, res);
        }

        const userJSON = await user.toShallowUserJSON()

        res.json({
            ...userJSON,
            accessToken,
            refreshToken
        }).end();
    })
}

export const LoginUserController: RouteController<LoginUserRequest, {}> = async (req, res) => {
    const { email, password } = req.body;

    const inputErr = AuthUtils.validateLoginFields({ email, password });

    if (inputErr) {
        return ControllerUtils.respondWithErr<LoginUserErrResponse>({ 
            status: ClientErrorStatusCodes.BadRequest, 
            data: { error: LoginUserErrors.MissingUserInput, field: inputErr.field, errMsg: inputErr.msg } 
        }, res)
    }

    // hash that will be used to enforce that a refresh token is only used once
    const newTokenHash = await generateRandomHash();

    db.User.findOneAndUpdate({ email }, { $set: { jwtHash: newTokenHash } }, async (err: NativeError, user: IUserDocument) => {
        if (err) {
            // status 500 if any error occurred while finding the user's collection, not including if it wasn't found
            return ControllerUtils.respondWithUnexpectedErr(res);
        } else if (!user) {
            return ControllerUtils.respondWithErr<LoginUserErrResponse>({ 
                status: ClientErrorStatusCodes.NotFound, 
                data: { error: LoginUserErrors.IncorrectEmailOrPassword, errMsg: "Incorrect email or password." } 
            }, res)
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return ControllerUtils.respondWithErr<LoginUserErrResponse>({ 
                status: ClientErrorStatusCodes.NotFound, 
                data: { error: LoginUserErrors.IncorrectEmailOrPassword, errMsg: "Incorrect email or password." } 
            }, res);
        }

        const { accessToken, refreshToken } = await generateTokens(user, newTokenHash);

        if (!accessToken || !refreshToken) {
            // 500 status if accessToken couldn't be created for some reason
            return ControllerUtils.respondWithUnexpectedErr(res);
        }

        const userJSON = await user.toShallowUserJSON();

        return res.json({
            ...userJSON,
            accessToken,
            refreshToken
        }).end();
    })
}

export const RefreshTokensController: RouteController<RefreshTokensRequest, {}> = async (req, res) => {
    const refreshToken = JWTUtils.getTokenFromHeader(req);
    const { status, userId, jwtHash } = JWTUtils.verifyRefreshToken(refreshToken ?? null);

    if (!refreshToken || !userId) {
        return res.status(401).end();
    } else if (status) {
        return res.status(status).end();
    }

    db.User.findById(userId, async (err: NativeError, user: IUserDocument) => {
        if (err) {
            console.error(err);
            return HandleControllerErr(err, res);
        }

        // if refreh token's hash matches hash in db, allow tokens to be refreshed
        if (user.jwtHash === jwtHash) {
            // hash that will be used to enforce that a refresh token is only used once
            const newTokenHash = await generateRandomHash();

            db.User.updateOne({ _id: userId }, { $set: { jwtHash: newTokenHash } }, async (err: NativeError, data: any) => {
                if (err) {
                    return HandleControllerErr(err, res);
                }

                const newAccessToken = user.generateAccessToken(newTokenHash, "10000");
                const newRefreshToken = user.generateRefreshToken(newTokenHash);

                if (!newAccessToken || !newRefreshToken) {
                    return res.status(500).end();
                }

                res.json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }).end()
            })
        } else {
            return res.status(401).end();
        }
    })
}

const generateRandomHash = async () => {
    return await bcrypt.hash(SECRET, 10)
}

const generateTokens = async (user: IUserDocument, hash: string) => {
    const accessToken = user.generateAccessToken(hash, "10000");
    const refreshToken = user.generateRefreshToken(hash);

    return { accessToken, refreshToken }
}