import { ControllerUtils } from "../utils/ControllerUtils";
import { LoginUserErrCodes, LoginUserRequest, RefreshTokensRequest, RegisterUserRequest } from "@groupfitnessapp/common/src/api/requests/auth.requests";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";
import db from "../models"
import { NativeError } from "mongoose";
import { IUserDocument } from "@groupfitnessapp/common/src/api/models/User.model";
import { JWTUtils } from "../utils/JWTUtils";
import { DBUpdateResponse, TValidController } from "./index";
import bcrypt from "bcrypt";
import { EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";

const SECRET = EnvUtils.getEnvVar(EnvVars.SECRET, "");

export const RegisterUserController: TValidController = ControllerUtils.createControllerFunc<RegisterUserRequest, {}>(async (req, res) => {
    db.User.create(req.body, async (err, user) => {
        if (err) {
            return HandleControllerErr(err, res);
        }

        const userJSON = await user.toShallowUserJSON()

        res.json(userJSON).end();
    })
})

export const LoginUserController: TValidController = ControllerUtils.createControllerFunc<LoginUserRequest, {}>(async (req, res) => {
    const { email, password } = req.body;

    // hash that will be used to enforce that a refresh token is only used once
    const newTokenHash = await bcrypt.hash(SECRET, 10);
    
    db.User.findOneAndUpdate({ email }, { $set: { jwtHash: newTokenHash } }, async (err: NativeError, user: IUserDocument) => {
        if (err) {
            return HandleControllerErr(err, res);
        } else if (!user) {
            return res.status(LoginUserErrCodes.IncorretEmailPassword).end();
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(LoginUserErrCodes.IncorretEmailPassword).end();
        }

        const accessToken = user.generateAccessToken(newTokenHash, "10000");
        const refreshToken = user.generateRefreshToken(newTokenHash);

        if (!accessToken || !refreshToken) {
            // return 500 status if accessToken couldn't be created for some reason
            return res.status(LoginUserErrCodes.UnexpectedCondition).end();
        }

        const userJSON = await user.toShallowUserJSON();

        return res.json({
            ...userJSON, 
            accessToken,
            refreshToken
        }).end();
    })
})

export interface TestRequest {
    UrlParams: {

    }
    ReqBody: {
        id: string;
        email: string;
    }
    ResBody: any
}

/* example of a controller for a protected route */
export const AuthTestController: TValidController = ControllerUtils.createControllerFunc<TestRequest, { user: { id?: string } }>(async (req, res) => {
    const { id, email } = req.body;

    db.User.findOne({ email }, async (err: NativeError, user: IUserDocument) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }

        console.log(req.user)

        return res.json(user).end();
    })
})

export const RefreshTokensController: TValidController = ControllerUtils.createControllerFunc<RefreshTokensRequest, {}>(async (req, res) => {
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
            const newTokenHash = await bcrypt.hash(SECRET, 10);

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
})