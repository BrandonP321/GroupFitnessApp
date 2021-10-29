const AuthRoutes = {
    RegisterUser: "/api/auth/register",
    LoginUser: "/api/auth/login",
    AuthTest: "/api/auth/test",
    RefreshTokens: "/api/auth/refresh-tokens"
}

const UserRoutes = {
    GetAllUsers: "/api/user/all",
    GetUser: "/api/user/:id"
}

export const Routes = {
    ...AuthRoutes,
    ...UserRoutes
}

export type ValidRoute = keyof typeof Routes;