import { ControllerUtils } from "./ControllerUtils";
import jwt from "jsonwebtoken";
import { EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import type { Request, Response } from "express";

interface IVerifiedTokenResponse {
    status?: number;
    isExpired?: boolean;
    token?: jwt.JwtPayload;
    userId?: string;
    jwtHash?: string;
}

export class JWTUtils {
    private static signToken(userId: string, isRefreshToken: boolean, hash: string, expiresIn?: string) {
        const tokenSecret = EnvUtils.getEnvVar(isRefreshToken ? EnvVars.REFRESH_TOKEN_SECRET : EnvVars.ACCESS_TOKEN_SECRET);

        if (!tokenSecret) {
            console.error("Error getting SECRET Env Variable");
            return undefined;
        }

        const signOptions: jwt.SignOptions = {
            /* sub -> id of user */
            subject: userId,
            /* jti -> unique hash to enforce refresh tokens are only used once */
            jwtid: hash
        }

        if (expiresIn) {
            signOptions.expiresIn = expiresIn;
        }

        return jwt.sign({}, tokenSecret, signOptions)
    }

    public static signAccessToken (userId: string, hash: string, expiresIn: string) {
        return JWTUtils.signToken(userId, false, hash, expiresIn);
    }

    public static signRefreshToken(userId: string, hash: string, expiresIn?: string) {
        return JWTUtils.signToken(userId, true, hash, expiresIn);
    }

    private static verifyToken(token: string | null, secret: string | undefined): IVerifiedTokenResponse {
        if (!secret || !token) {
            console.error("Error getting SECRET Env Variable");
            // TODO: update status code
            return { status: 400 }
        } 
        else if (!token) {
            console.error("Refresh token could not be found");
            // TODO: update status code
            return { status: 400 }
        }

        try {
            const verifiedToken = jwt.verify(token, secret)
            const tokenIsString = typeof verifiedToken === "string";

            return {
                token: !tokenIsString ? verifiedToken : undefined,
                isExpired: false,
                userId: !tokenIsString ? verifiedToken.sub : undefined,
                jwtHash: !tokenIsString ? verifiedToken.jti : undefined
            }
        } catch (err) {
            // error will be thrown if token is expired
            const decodedToken = jwt.decode(token);

            return { 
                isExpired: true, 
                userId: typeof decodedToken?.sub === "string" ? decodedToken.sub : undefined
            };
        }
    }

    public static verifyAccessToken(token: string | null) {
        const ACCESS_TOKEN_SECRET = EnvUtils.getEnvVar(EnvVars.ACCESS_TOKEN_SECRET);

        return this.verifyToken(token, ACCESS_TOKEN_SECRET);
    }

    public static verifyRefreshToken(token: string | null) {
        const REFRESH_TOKEN_SECRET = EnvUtils.getEnvVar(EnvVars.REFRESH_TOKEN_SECRET);

        return this.verifyToken(token, REFRESH_TOKEN_SECRET);
    }

    public static setTokenHeader(token: string, res: Response) {
        return ControllerUtils.setResponseHeader("authorization", `Bearer ${token}`, res);
    }

    public static getTokenFromHeader(req: Request<any>) {
        const token = req.headers.authorization?.split(" ")[1];
        return token;
    }

    // public static verifyRefreshToken
}
