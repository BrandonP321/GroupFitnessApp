/**
 * URL params but be identical to those in the request type in the
 * corresponding <route>.types.ts file in the common package
 */

import { LoginUserRequest, RefreshTokensRequest, RegisterUserRequest } from "~API/requests/auth.types";
import { AddUserToChatRequest, CreateChatRequest, GetChatRequest, RemoveUserFromChatRequest } from "~API/requests/chat.types";
import { GetAllUsersRequest, GetUserRequest } from "~API/requests/user.requests";

export const AuthRoutes = {
    RegisterUser: (params?: RegisterUserRequest["UrlParams"]) => "/api/auth/register",
    LoginUser: (params?: LoginUserRequest["UrlParams"]) => "/api/auth/login",
    RefreshTokens: (params?: RefreshTokensRequest["UrlParams"]) => "/api/auth/refresh-tokens",
}

export const UserRoutes = {
    GetAllUsers: (params?: GetAllUsersRequest["UrlParams"]) => "/api/user/all",
    GetUser: (params?: GetUserRequest["UrlParams"]) => `/api/user/${params?.id ?? ":id"}`
}

export const ChatRoutes = {
    createNewChat: (params?: CreateChatRequest["UrlParams"]) => "/api/chat/create",
    getChat: (params?: GetChatRequest["UrlParams"]) => `/api/chat/${params?.chatId ?? ":chatId"}`,
    addUserToChat: (params?: AddUserToChatRequest["UrlParams"]) => "/api/chat/users/add",
    removeUserFromChat: (params?: RemoveUserFromChatRequest["UrlParams"]) => "/api/chat/users/remove"
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes,
    ...ChatRoutes,
}

export type ValidRoute = keyof typeof Routes;