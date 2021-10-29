import { RequestHandler, Request, Response, NextFunction } from "express";

export class MiddlewareUtils {
    public static createMiddlewareFunc<RequestTypes extends { UrlParams: {}; ReqBody: {}; ResBody: {} }, ReqProps>(cb: (
        req: ReqProps & Request<RequestTypes["UrlParams"], {}, RequestTypes["ReqBody"], {}, Record<string, any>>, 
        res: Response<RequestTypes["ResBody"], Record<string, any>> & string,
        next: NextFunction
        ) => any) {
        return cb
    }
}

interface ITest extends Request {
    hellow: string;
}