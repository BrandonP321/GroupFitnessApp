import axios, { AxiosResponse } from "axios";
import { ChatRoutes } from "~API/routes";
import { APIUtils } from "~Utils/APIUtils";
import { APIRequest } from ".";
import { AddUserToChatRequest, CreateChatRequest, GetChatRequest, RemoveUserFromChatRequest } from "./chat.types";

const APIDomain = APIUtils.getApiDomain();

export const CreateNewChat: APIRequest<CreateChatRequest> = (urlParams, bodyParams) => {
    return axios.post(`${APIDomain}${ChatRoutes.createNewChat(urlParams)}`, bodyParams)
}

export const GetChat: APIRequest<GetChatRequest> = (urlParams, bodyParams) => {
    return axios.get(`${APIDomain}${ChatRoutes.getChat(urlParams)}`, bodyParams)
}

export const AddUserToChat: APIRequest<AddUserToChatRequest> = (urlParams, bodyParams) => {
    return axios.put(`${APIDomain}${ChatRoutes.addUserToChat(urlParams)}`, bodyParams)
}

export const RemoveUserFromChat: APIRequest<RemoveUserFromChatRequest> = (urlParams, bodyParams) => {
    return axios.put(`${APIDomain}${ChatRoutes.removeUserFromChat(urlParams)}`, bodyParams)
}