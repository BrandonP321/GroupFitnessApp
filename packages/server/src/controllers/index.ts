/* This type fixes the type error thrown when passing controller into express route */
export type TValidController = (req: any, res: any) => any

export interface DBUpdateResponse {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: any;
    upsertedCount: number;
    matchedCount: number;
}