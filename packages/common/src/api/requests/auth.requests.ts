import axios, { AxiosResponse } from "axios";
import { APIUtils } from "../../utils/APIUtils";
import { IUserShallowResponse } from "../models/User.model";
import { ClientErrorStatusCodes, ServerErrorStatusCodes } from "./statusCodes";
import { LoginUserRequest, RefreshTokensRequest, RegisterUserRequest } from "./auth.types";

const APIDomain = APIUtils.getApiDomain();

// GET

// POST

export function RegisterUser (urlParams: RegisterUserRequest["UrlParams"], bodyParams: RegisterUserRequest["ReqBody"]): Promise<AxiosResponse<RegisterUserRequest["ResBody"]>> {
    const url = `${APIDomain}${APIUtils.getRouteString("RegisterUser", urlParams)}`;

    return axios.post(url, bodyParams);
}

export function LoginUser (urlParams: LoginUserRequest["UrlParams"], bodyParams: LoginUserRequest["ReqBody"]): Promise<AxiosResponse<LoginUserRequest["ResBody"]>> {
    const url = `${APIDomain}${APIUtils.getRouteString("LoginUser", urlParams)}`;

    return axios.post(url, bodyParams);
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