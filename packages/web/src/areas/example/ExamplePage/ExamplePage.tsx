import React, { ReactElement, useState } from "react"
import { useParams } from "react-router";
import { ExamplePageUrlParams } from "../ExampleArea.types";
import styles from "./ExamplePage.module.scss";
import PageHelmet from "global/UI/PageHelmet/PageHelmet";
// import { LoginUser } from "@groupfitnessapp/common/src/api/requests/auth.requests";
import { LoginUser } from "@groupfitnessapp/common";

interface Props {
    
}

/**
 * Example page with loading spinner wrapper
 */
export default function ExamplePage(props: Props): ReactElement {
    const { id } = useParams<ExamplePageUrlParams>()
    const [isLoading, setIsLoading] = useState(false);

    const attemptLogin = () => {
        setIsLoading(true);

        LoginUser({ email: "test@test.com", password: "pass" })
            .then(res => {
                console.log(res);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div>
            <PageHelmet title={"Example Page"}/>
            <button onClick={attemptLogin} disabled={isLoading}>Log in</button>
        </div>
    )
}
