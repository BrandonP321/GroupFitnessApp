import { MiddlewareUtils } from "../utils/MiddlewareUtils";
import { JWTUtils } from "../utils/JWTUtils";

// other properties that will exist in Request object
export interface IAuthJWTReqProps {
    user: {
        id?: string;
    }
}

export const authenticateJWT: ((req: any, res: any, next: any) => any) = MiddlewareUtils.createMiddlewareFunc<any, IAuthJWTReqProps>((req, res, next) => {
    const token = JWTUtils.getTokenFromHeader(req);

    if (token) {
        const { token: vToken, isExpired, userId, status } = JWTUtils.verifyAccessToken(token);

        if (status) {
            // if jwt is expired, alert client so it can attempt to refresh the token
            return res.status(status).end();
        } else if (!vToken) {
            // if token is undefined, there is no token (and no user id from the token), so user needs to re-auth to generate new tokens
            return res.status(401).end();
        } else {
            req.user = { id: userId };

            next();
        }

    } else {
        return res.status(401).end();
    }
})
