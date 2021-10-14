import axios, { AxiosResponse } from "axios";
import { APIUtils } from "../../utils";

const APIDomain = APIUtils.getApiDomain();

// GET

/**
 * returns list of all users
 */
export interface GetAllUsersUrlParams {
}

export interface GetAllUsersBodyParams {

}

export interface GetAllUsersResponse {

}

function GetAllUsers (urlParams: GetAllUsersUrlParams, bodyParams: GetAllUsersBodyParams): Promise<AxiosResponse<GetAllUsersResponse>> {
    const url = `${APIDomain}${APIUtils.getRouteString("GetAllUsers", urlParams)}`;

    return axios.get(url, bodyParams);
}

/**
 * returns single user's data
 */
export interface GetUserUrlParams {
    id: string;
}

export interface GetUserBodyParams {

}

export interface GetUserResponse {

}

function GetUser (urlParams: GetUserUrlParams, bodyParams: GetUserBodyParams): Promise<AxiosResponse<GetUserResponse>> {
    const url = `${APIDomain}${APIUtils.getRouteString("GetUser", urlParams)}`;

    return axios.get(url, bodyParams);
}

// POST

// PUT

// DELETE

export default {
    GetAllUsers,
    GetUser,
}