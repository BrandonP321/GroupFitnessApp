import type { Request, Response } from "express";

/* Type of Express route controller function */
export type RouteController<T extends { UrlParams: {}; ReqBody: {}; ResBody: {} }, ResLocals>  = (
    req: Request<T["UrlParams"], T["ResBody"], T["ReqBody"], {}, {}>,
    res: Response<T["ResBody"], ResLocals>
) => void

export interface DBUpdateResponse {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: any;
    upsertedCount: number;
    matchedCount: number;
}