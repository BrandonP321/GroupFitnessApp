import type { Request, Response } from "express";

export class ControllerUtils {
    public static createControllerFunc<RequestTypes extends { UrlParams: {}; ReqBody: {}; ResBody: {} }, ReqProps>(cb: (
        req: ReqProps & Request<RequestTypes["UrlParams"], {}, RequestTypes["ReqBody"], {}, Record<string, any>>, 
        res: Response<RequestTypes["ResBody"], Record<string, any>> & string
        ) => Promise<any>) {
        return cb
    }

    public static setResponseHeader(header: ValidHeaders, value: string, res: Response) {
        return res.setHeader(header, value);
    }
}

type ValidHeaders = 
    "authorization"