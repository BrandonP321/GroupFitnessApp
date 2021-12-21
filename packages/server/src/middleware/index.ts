export { configureApp } from "./appConfiguration.middleware";
export { authenticateJWT } from "./authJWT.middleware";
export { configureSocket } from "./configureSocket";
import { NextFunction, Request, Response } from "express"

export type RouteMiddleware<T extends { UrlParams: {}; ReqBody: {}; ResBody: {} }, ResLocals>  = (
    req: Request<T["UrlParams"], T["ResBody"], T["ReqBody"], {}, {}>,
    res: Response<T["ResBody"], ResLocals>,
    next: NextFunction
) => void;