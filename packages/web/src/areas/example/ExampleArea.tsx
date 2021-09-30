import React, { ReactElement } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RouteUtils from "utils/RouteUtils";
import { Areas } from "~Navigation/AreaNames";
import { AsyncRoute } from "~Navigation/Navigation";
import { RouteNames } from "~Navigation/RouteNames";

export default function ExampleArea(): ReactElement {
    return (
        <Router>
            <Switch>
                {/* creates async component that is only rendered when it's exact path is hit */}
                <AsyncRoute exact path={RouteUtils.getRouteBasePath(Areas.Example, RouteNames.Example)} lazyComponentDynamicImport={() => import("./ExamplePage/ExamplePage")}/>
            </Switch>
        </Router>
    )
}
