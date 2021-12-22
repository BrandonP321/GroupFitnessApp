import { RequestErrors } from "./RequestErrors";

/* type of error thrown when a user needs to reauth due to not being able to to refresh their access token */
export type JWTAuthErrors = {
    error: typeof RequestErrors.UserMustReAuth | typeof RequestErrors.ExpiredAccessToken;
}

/* error response when an unexpected condition occurred on the server */
export type UnexpectedConditionErr = {
    error: typeof RequestErrors.UnexpectedCondition
}

export type ProtectedRouteErrors = JWTAuthErrors | UnexpectedConditionErr;