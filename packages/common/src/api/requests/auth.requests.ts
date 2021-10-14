import axios, { AxiosResponse } from "axios";
import { APIUtils } from "../../utils";
import { IUserShallowResponse } from "../models/User.model";

const APIDomain = APIUtils.getApiDomain();

// GET

// POST

export interface RegisterUserUrlParams {

}

export interface RegisterUserBodyParams {
    email: string;
    password: string;
}

export interface RegisterUserResponse extends IUserShallowResponse {

}

export function RegisterUser (urlParams: RegisterUserUrlParams, bodyParams: RegisterUserBodyParams): Promise<AxiosResponse<RegisterUserResponse>> {
    const url = `${APIDomain}${APIUtils.getRouteString("RegisterUser", urlParams)}`;

    return axios.post(url, bodyParams);
}


export interface LoginUserUrlParams {

}

export interface LoginUserBodyParams {
    email: string;
    password: string;
}

export interface LoginUserResponse extends IUserShallowResponse {

}

export function LoginUser (urlParams: LoginUserUrlParams, bodyParams: LoginUserBodyParams): Promise<AxiosResponse<LoginUserResponse>> {
    const url = `${APIDomain}${APIUtils.getRouteString("RegisterUser", urlParams)}`;

    return axios.post(url, bodyParams);
}

// PUT

// DELETE

export default {
    RegisterUser,
}