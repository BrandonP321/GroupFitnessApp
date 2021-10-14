const AuthRoutes = {
    RegisterUser: "/api/auth/register"
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