/**
 * URL params but be identical to those in the request type in the
 * corresponding <route>.types.ts file in the common package
 */

import { GetChatRequest } from "~API/requests/chat.types";
import { GetUserRequest } from "~API/requests/user.requests";
import { APIUtils } from "~Utils/APIUtils";

const APIDomain = APIUtils.getApiDomain();

const AuthRoutes = {
    RegisterUser: () => `${APIDomain}/api/auth/register`,
    LoginUser: () => `${APIDomain}/api/auth/login`,
    RefreshTokens: () => `${APIDomain}/api/auth/refresh-tokens`,
}

const UserRoutes = {
    GetAllUsers: () => `${APIDomain}/api/user/all`,
    GetUser: (params?: GetUserRequest["UrlParams"]) => `${APIDomain}/api/user/${params?.id ?? ":id"}`,
}

const ChatRoutes = {
    createNewChat: () => `${APIDomain}/api/chat/create`,
    getChat: (params?: GetChatRequest["UrlParams"]) => `${APIDomain}/api/chat/${params?.chatId ?? ":chatId"}`
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes,
    ...ChatRoutes,
}

export type ValidRoute = keyof typeof Routes;