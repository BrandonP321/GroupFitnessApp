import React, { ReactElement, useState } from "react"
import { useParams } from "react-router";
import { ExamplePageUrlParams } from "../ExampleArea.types";
import styles from "./ExamplePage.module.scss";
import PageHelmet from "global/UI/PageHelmet/PageHelmet";
import { masterConfig } from "../../../../../common/config/master.config";

interface Props {
    
}

/**
 * Example page with loading spinner wrapper
 */
export default function ExamplePage(props: Props): ReactElement {
    const { id } = useParams<ExamplePageUrlParams>()
    console.log(masterConfig.test);

    return (
        <div>
            <PageHelmet title={"Example Page"}/>
            <h1 className={styles.heading}>This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   </h1>
        </div>
    )
}
