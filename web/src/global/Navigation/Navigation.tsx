import React, { ReactElement, useEffect } from "react"
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route, RouteProps } from "react-router-dom";
import Routes from "./Routes";

export default function Navigation(): ReactElement {
    return (
        <Router>
            <Switch>
                {/* only loads in example area routes when url contains '/example' */}
                <AsyncRoute path={Routes?.Example?.areaPath} lazyComponentDynamicImport={Routes?.Example?.lazyAreaComponentDynamicImport} />
            </Switch>
        </Router>
    )
}

interface IAsyncRoute extends Omit<RouteProps, "component"> {
    /* dynamic import for component to be rendered by route */
    lazyComponentDynamicImport: () => Promise<any>
}

export const AsyncRoute = (props: IAsyncRoute) => {
    const { lazyComponentDynamicImport, ...rest } = props;

    const lazyComponent = loadable(lazyComponentDynamicImport, { fallback: <RouteFallback/> })

    return (
        <Route
            {...rest}
            component={lazyComponent} />
    )
}

/**
 * This component shows/hides the loading spinner wrapping the entire page
 */
export const RouteFallback = () => {
    useEffect(() => {

    }, [])

    return (
        <></>
    )
}

export const routeFallbackOptions = {
    fallback: <RouteFallback/>
}