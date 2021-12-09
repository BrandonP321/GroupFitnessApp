import { Routes, ValidRoute } from "../api/routes";

export class APIUtils {
    public static getApiDomain = () => {
        // TODO: update this return value with value from config
        // return "http://localhost:8000";
        return "http://10.0.0.172:8000";
    }

    /**
     * returns the url for a given api route, replacing url params with their provided values
     */
    public static getRouteString = (route: ValidRoute, urlParams?: { [key: string]: any }) => {
        let routeStr = Routes[route] ?? "";

        for (let param in (urlParams ?? {})) {
            routeStr = routeStr.replace(`:${param}`, urlParams?.[param]);
        }

        return routeStr;
    }
}