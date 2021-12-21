import axios, { AxiosResponse } from "axios";
import { LoginUserRequest, RefreshTokensRequest, RegisterUserRequest } from "./auth.types";
import { Routes } from "..";

// GET

// POST

export function RegisterUser (bodyParams: RegisterUserRequest["ReqBody"]): Promise<AxiosResponse<RegisterUserRequest["ResBody"]>> {
    return axios.post(Routes.RegisterUser(), bodyParams);
}

export function LoginUser (bodyParams: LoginUserRequest["ReqBody"]): Promise<AxiosResponse<LoginUserRequest["ResBody"]>> {
    return axios.post(Routes.LoginUser(), bodyParams);
}

export function RefreshTokens (bodyParams: RefreshTokensRequest["ReqBody"]): Promise<AxiosResponse<RefreshTokensRequest["ResBody"]>> {
    return axios.post(Routes.RefreshTokens(), bodyParams);
}

// PUT

// DELETE