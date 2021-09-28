import React, { ReactElement } from "react"
import loadable, { LoadableComponent } from "@loadable/component";
import { BrowserRouter as Router, Switch, Route, RouteProps } from "react-router-dom";
import LoadingSpinnerWrapper from "~Components/LoadingSpinnerWrapper/LoadingSpinnerWrapper";

export const routeFallbackOptions = {
    fallback: <LoadingSpinnerWrapper isLoading={true} />
}

const ExampleArea = loadable(() => import("~Areas/example/ExampleArea"), routeFallbackOptions);

export default function Navigation(): ReactElement {
    return (
        <Router>
            <Switch>
                {/* only loads in example area routes when url contains '/example/ */}
                <AsyncRoute path="/example/" lazyComponent={ExampleArea} />
            </Switch>
        </Router>
    )
}

interface IAsyncRoute extends Omit<RouteProps, "component"> {
    lazyComponent: LoadableComponent<any>
}

export const AsyncRoute = (props: IAsyncRoute) => {
    const { lazyComponent, ...rest } = props;

    return (
        <Route
            {...rest}
            component={lazyComponent} />
    )
}
