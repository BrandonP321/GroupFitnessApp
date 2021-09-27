import loadable from "@loadable/component";
import React, { ReactElement } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AsyncRoute, routeFallbackOptions } from "~Navigation/Navigation";

const ExamplePage = loadable(() => import("~Areas/example/ExamplePage/ExamplePage"), routeFallbackOptions);

export default function ExampleArea(): ReactElement {
    return (
        <Router>
            <Switch>
                {/* creates async component that is only rendered when it's exact path is hit */}
                <AsyncRoute exact path="/example/test/:id" lazyComponent={ExamplePage}/>
            </Switch>
        </Router>
    )
}
