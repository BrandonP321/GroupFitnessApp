import Area, { IAreaRoute, AreaRoute } from "./Area";
import { Areas, validArea } from "./AreaNames";
import { RouteNames } from "./RouteNames";

const ExampleAreaRoutes: IAreaRoute[] = [
    { name: RouteNames.Example, areaRoute: (area, routeName, urlParams) => new AreaRoute(area, routeName, urlParams), params: { path: "Example/:id" } },
]

/* All Routes nested within their respective area */
const Routes: { [key in validArea]: Area } = {
    Example: new Area({
        areaName: Areas.Example,
        lazyComponentDynamicImport: () => import("~Areas/example/ExampleArea"),
        routes: ExampleAreaRoutes
    })
} as const;

export default Routes;