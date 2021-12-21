const AuthRoutes = {
    RegisterUser: "/api/auth/register",
    LoginUser: "/api/auth/login",
    RefreshTokens: "/api/auth/refresh-tokens"
}

const UserRoutes = {
    GetAllUsers: "/api/user/all",
    GetUser: "/api/user/:id"
}

const ChatRoutes = {
    createNewChat: "/api/chat/create"
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes,
    ...ChatRoutes,
}

export type ValidRoute = keyof typeof Routes;