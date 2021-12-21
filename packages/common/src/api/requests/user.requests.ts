import axios, { AxiosResponse } from "axios";
import { APIUtils } from "../../utils";

const APIDomain = APIUtils.getApiDomain();

// GET

export interface GetAllUsersRequest {
    UrlParams: {
    }
    ReqBody: {
    }
    ResBody: {
        // TODO: update this value
    }
}

// function GetAllUsers (urlParams: GetAllUsersRequest["UrlParams"], bodyParams: GetAllUsersRequest["ReqBody"]): Promise<AxiosResponse<GetAllUsersRequest["ResBody"]>> {
    // const url = `${APIDomain}${APIUtils.getRouteString("GetAllUsers", urlParams)}`;

    // return axios.get(url, bodyParams);
// }

export interface GetUserRequest {
    UrlParams: {
        id: string;
    }
    ReqBody: {
    }
    ResBody: {   
    }
}

// function GetUser (urlParams: GetUserRequest["UrlParams"], bodyParams: GetUserRequest["ReqBody"]): Promise<AxiosResponse<GetUserRequest["ResBody"]>> {
    // const url = `${APIDomain}${APIUtils.getRouteString("GetUser", urlParams)}`;

    // return axios.get(url, bodyParams);
// }

// POST

// PUT

// DELETE