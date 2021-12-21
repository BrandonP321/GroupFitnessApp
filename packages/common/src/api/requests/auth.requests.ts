import axios, { AxiosResponse } from "axios";
import { LoginUserRequest, RefreshTokensRequest, RegisterUserRequest } from "./auth.types";
import { Routes } from "..";
import { APIUtils } from "~Utils/APIUtils";

// GET

// POST

const APIDomain = APIUtils.getApiDomain();

export function RegisterUser (bodyParams: RegisterUserRequest["ReqBody"]): Promise<AxiosResponse<RegisterUserRequest["ResBody"]>> {
    return axios.post(`${APIDomain}${Routes.RegisterUser()}`, bodyParams);
}

export function LoginUser (bodyParams: LoginUserRequest["ReqBody"]): Promise<AxiosResponse<LoginUserRequest["ResBody"]>> {
    return axios.post(`${APIDomain}${Routes.LoginUser()}`, bodyParams);
}

export function RefreshTokens (bodyParams: RefreshTokensRequest["ReqBody"]): Promise<AxiosResponse<RefreshTokensRequest["ResBody"]>> {
    return axios.post(`${APIDomain}${Routes.RefreshTokens()}`, bodyParams);
}

// PUT

// DELETE