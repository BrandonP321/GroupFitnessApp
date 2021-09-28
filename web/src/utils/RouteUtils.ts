import { ExamplePageUrlParams } from "~Areas/example/ExampleArea.types";
import { validArea } from "~Navigation/Area";
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
    public static getRouteBasePath(routeName: validRouteName, area: validArea) {
        return RouteUtils.getRoute(routeName, area)?.basePath
    }

    /**
     * returns the path for a given route with the option to pass in appropriate url parameters for that route
     */
    public static getRoutePath<RouteUrlParams>(routeName: validRouteName, area: validArea, params?: RouteUrlParams) {
        return RouteUtils.getRoute(routeName, area)
    }
    
    /**
     * returns the class instance of a given route
     */
    public static getRoute(routeName: validRouteName, area: validArea) {
        // loop over routes for given area
        for (let route of (Routes[area]?.routes ?? [])) {
            // if route name matches provided name, return that route class instance
            if (route.name === routeName) {
                return route;
            }
        }
    }
}

RouteUtils.getRoutePath<ExamplePageUrlParams>("Example", "Example", { id: "" })

export default RouteUtils;