import { LoadableComponent } from "@loadable/component";
import { validRouteName } from "./RouteNames";

export const Areas = {
    Example: "Example"
} as const;

export type validArea = keyof typeof Areas;

export class AreaRoute {
    /* path for setting up routing */
    basePath: string | null = null;
    /* name of route, used for finding route in routes array */
    name: validRouteName | null = null;

    constructor(area: string, routeName: string) {
        this.basePath = `/${area}/${routeName}`
    }
}

export interface IAreaRoute {
    name: validRouteName;
    areaRoute: (area: validArea, routeName: validRouteName) => AreaRoute
}

interface IAreaParams {
    /* name of area used to define the route paths */
    areaName: validArea;
    /* area component to render routes */
    lazyComponent: LoadableComponent<any>;
    /* Routes inside of area */
    readonly routes: IAreaRoute[]
}

class Area {
    public readonly routes: AreaRoute[] = [];
    public areaPath: string | null = null;

    constructor(params: IAreaParams) {
        params.routes?.forEach(route => this.routes.push(route.areaRoute(params.areaName, route.name)));

        this.areaPath = `/${params.areaName}`
    }
}

export default Area;