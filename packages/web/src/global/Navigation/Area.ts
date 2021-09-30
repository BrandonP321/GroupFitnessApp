import { validArea } from "./AreaNames";
import { validRouteName } from "./RouteNames";

export interface IAreaRoute {
    name: validRouteName;
    areaRoute: (area: validArea, routeName: validRouteName, params: { path?: string }) => AreaRoute,
    params?: { path?: string }
}

export class AreaRoute {
    /* path for setting up routing */
    basePath: string | undefined = undefined;
    /* name of route, used for finding route in routes array */
    name: validRouteName | null = null;

    constructor(area: string, routeName: validRouteName, params: { path?: string }) {
        this.basePath = `/${area}/${params?.path ?? routeName}`
        this.name = routeName;
    }
}

interface IAreaParams {
    /* name of area used to define the route paths */
    areaName: validArea;
    /* dynamic import for area component to render routes */
    lazyComponentDynamicImport: () => Promise<any>;
    /* Routes inside of area */
    readonly routes: IAreaRoute[]
}

class Area {
    public readonly routes: AreaRoute[] = [];
    public areaPath: string | undefined = undefined;
    public lazyAreaComponentDynamicImport: any = undefined;

    constructor(params: IAreaParams) {
        // create a new AreaRoute instance of each route in the area
        params.routes?.forEach(route => {
            const newRoute = route.areaRoute(params.areaName, route.name, { path: route.params?.path });
            // push the new AreaRoute instance to the array of routes for the area
            this.routes.push(newRoute)
        });

        this.areaPath = `/${params.areaName}`;
        this.lazyAreaComponentDynamicImport = params.lazyComponentDynamicImport;
    }
}

export default Area;