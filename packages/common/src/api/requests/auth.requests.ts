import axios, { AxiosResponse } from "axios";
import { APIUtils } from "../../utils";
import { IUserShallowResponse } from "../models/User.model";
import { ClientErrorStatusCodes, ServerErrorStatusCodes } from "./statusCodes";

const APIDomain = APIUtils.getApiDomain();

// GET

// POST

export interface RegisterUserRequest {
    UrlParams: {

    }
    ReqBody: {

    }
    ResBody: {
        
    } & IUserShallowResponse
}

export function RegisterUser (urlParams: RegisterUserRequest["UrlParams"], bodyParams: RegisterUserRequest["ReqBody"]): Promise<AxiosResponse<RegisterUserRequest["ResBody"]>> {
    const url = `${APIDomain}${APIUtils.getRouteString("RegisterUser", urlParams)}`;

    return axios.post(url, bodyParams);
}


export interface LoginUserRequest {
    UrlParams: {

    }
    ReqBody: {
        email: string;
        password: string;
    }
    ResBody: {
        accessToken: string;
        refreshToken: string;
    } & IUserShallowResponse,
}

export enum LoginUserErrCodes {
    IncorretEmailPassword = ClientErrorStatusCodes.Unauthorized,
    UnexpectedCondition = ServerErrorStatusCodes.InternalServerError
}

export function LoginUser (urlParams: LoginUserRequest["UrlParams"], bodyParams: LoginUserRequest["ReqBody"]): Promise<AxiosResponse<LoginUserRequest["ResBody"]>> {
    const url = `${APIDomain}${APIUtils.getRouteString("LoginUser", urlParams)}`;

    return axios.post(url, bodyParams);
}


export interface RefreshTokensRequest {
    UrlParams: {

    }
    ReqBody: {
        
    }
    ResBody: {
        accessToken: string;
        refreshToken: string;
    },
}

export enum RefreshTokensErrCodes {
    IncorretEmailPassword = ClientErrorStatusCodes.Unauthorized,
    UnexpectedCondition = ServerErrorStatusCodes.InternalServerError
}

export function RefreshTokens (urlParams: RefreshTokensRequest["UrlParams"], bodyParams: RefreshTokensRequest["ReqBody"]): Promise<AxiosResponse<RefreshTokensRequest["ResBody"]>> {
    const url = `${APIDomain}${APIUtils.getRouteString("RefreshTokens", urlParams)}`;

    return axios.post(url, bodyParams);
}

// PUT

// DELETE

export default {
    RegisterUser,
}