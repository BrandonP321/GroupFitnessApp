import { AxiosResponse } from "axios";
import { RequestErrors } from "./RequestErrors";

export type APIRequest<T extends { UrlParams: {}; ReqBody: {}; ResBody: {}; }> = (urlParams: T["UrlParams"], bodyParams: T["ReqBody"]) => Promise<AxiosResponse<T["ResBody"]>>

/* type of error thrown when a user needs to reauth due to not being able to to refresh their access token */
export type JWTAuthErrors = {
    error: typeof RequestErrors.UserMustReAuth | typeof RequestErrors.ExpiredAccessToken;
}

/* error response when an unexpected condition occurred on the server */
export type UnexpectedConditionErr = {
    error: typeof RequestErrors.UnexpectedCondition
}

export type ProtectedRouteErrors = JWTAuthErrors | UnexpectedConditionErr;