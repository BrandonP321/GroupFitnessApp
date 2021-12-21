/**
 * URL params but be identical to those in the request type in the
 * corresponding <route>.types.ts file in the common package
 */

import { CreateChatRequest, GetChatRequest } from "~API/requests/chat.types";
import { GetAllUsersRequest, GetUserRequest } from "~API/requests/user.requests";

const AuthRoutes = {
    RegisterUser: () => "/api/auth/register",
    LoginUser: () => "/api/auth/login",
    RefreshTokens: () => "/api/auth/refresh-tokens",
}

const UserRoutes = {
    GetAllUsers: () => "/api/user/all",
    GetUser: (params?: GetUserRequest["UrlParams"]) => `/api/user/${params?.id ?? ":id"}`,
    // GetAllUsers: "/api/user/all",
    // GetUser: "/api/user/:id",
}

const ChatRoutes = {
    createNewChat: () => "/api/chat/create",
    getChat: (params?: GetChatRequest["UrlParams"]) => `/api/chat/${params?.chatId ?? ":chatId"}`
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes,
    ...ChatRoutes,
}

export type ValidRoute = keyof typeof Routes;