import loadable from "@loadable/component";
import Area, { IAreaRoute, AreaRoute, Areas, validArea } from "./Area";
import { routeFallbackOptions } from "./Navigation";
import { RouteNames, validRouteName } from "./RouteNames";

const ExampleAreaRoutes: IAreaRoute[] = [
    { name: RouteNames.Example, areaRoute: (area, routeName) => new AreaRoute(area, routeName) },
]

const Routes: { [key in validArea]: Area } = {
    Example: new Area({
        areaName: Areas.Example,
        lazyComponent: loadable(() => import("~Areas/example/ExampleArea"), routeFallbackOptions),
        routes: ExampleAreaRoutes
    })
} as const;

export default Routes;