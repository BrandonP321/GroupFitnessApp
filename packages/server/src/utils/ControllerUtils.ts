import { RequestHandler } from "express";

export class ControllerUtils {
    public static createControllerFunc<UrlParams, ReqBody>(cb: RequestHandler<UrlParams, {}, ReqBody>) {
        return cb
    }
}