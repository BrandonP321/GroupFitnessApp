import { MiddlewareUtils } from "~Utils/MiddlewareUtils";
import { JWTUtils } from "~Utils/JWTUtils";
import { RouteMiddleware } from ".";

// other properties that will exist in Request object
export interface IAuthJWTResLocals {
    user: {
        id: string;
    }
}

export const authenticateJWT: RouteMiddleware<{ UrlParams: {}, ReqBody: {}, ResBody: {} }, IAuthJWTResLocals> = (req, res, next) => {
    const token = JWTUtils.getTokenFromHeader(req);

    if (token) {
        const { token: vToken, isExpired, userId, status } = JWTUtils.verifyAccessToken(token);

        if (status) {
            // if jwt is expired, alert client so it can attempt to refresh the token
            return res.status(status).end();
        } else if (!vToken || !userId) {
            // if token is undefined, there is no token (and no user id from the token), so user needs to re-auth to generate new tokens
            return res.status(401).end();
        } else {
            res.locals.user = { id: userId };

            next();
        }

    } else {
        return res.status(401).end();
    }
}