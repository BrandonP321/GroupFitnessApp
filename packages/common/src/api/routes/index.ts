/**
 * URL params but be identical to those in the request type in the
 * corresponding <route>.types.ts file in the common package
 */

import { GetChatRequest } from "~API/requests/chat.types";
import { GetUserRequest } from "~API/requests/user.requests";

export const AuthRoutes = {
    RegisterUser: () => "/api/auth/register",
    LoginUser: () => "/api/auth/login",
    RefreshTokens: () => "/api/auth/refresh-tokens",
}

export const UserRoutes = {
    GetAllUsers: () => "/api/user/all",
    GetUser: (params?: GetUserRequest["UrlParams"]) => `/api/user/${params?.id ?? ":id"}`
}

export const ChatRoutes = {
    createNewChat: () => "/api/chat/create",
    getChat: (params?: GetChatRequest["UrlParams"]) => `/api/chat/${params?.chatId ?? ":chatId"}`,
    addUserToChat: () => "/api/chat/users/add",
    removeUserFromChat: () => "/api/chat/users/remove"
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes,
    ...ChatRoutes,
}

export type ValidRoute = keyof typeof Routes;