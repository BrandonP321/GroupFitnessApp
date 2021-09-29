import { ExamplePageUrlParams } from "~Areas/example/ExampleArea.types";
import { validArea } from "~Navigation/AreaNames";
import { validRouteName } from "~Navigation/RouteNames";
import Routes from "~Navigation/Routes";

class RouteUtils {
    
    /* returns path for a given area */
    public static getAreaRoutePath(areaName: validArea) {
        return Routes[areaName]
    }

    /**
     * returns the base path for a route to be passed in to <Route/> components
     */
    public static getRouteBasePath(area: validArea, routeName: validRouteName) {
        return RouteUtils.getRoute(routeName, area)?.basePath
    }

    /**
     * returns the path for a given route with the option to pass in appropriate url parameters for that route
     */
    public static getRoutePath<RouteUrlParams extends { [key: string]: any }>(area: validArea, routeName: validRouteName, params?: RouteUrlParams) {
        let basePath = RouteUtils.getRouteBasePath(routeName, area)

        // if parameters were provided
        if (params) {
            // replace parameters in path string with provided parameter values
            Object.keys(params).forEach(p => basePath = basePath?.replace(`:${p}`, params[p]))
        }

        return basePath
    }
    
    /**
     * returns the class instance of a given route
     */
    public static getRoute(area: validArea, routeName: validRouteName) {
        // loop over routes for given area
        for (let route of (Routes[area]?.routes ?? [])) {
            // if route name matches provided name, return that route class instance
            if (route.name === routeName) {
                return route;
            }
        }
    }
}

export default RouteUtils;