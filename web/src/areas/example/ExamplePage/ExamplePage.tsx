import React, { ReactElement, useState } from "react"
import { useParams } from "react-router";
import LoadingSpinnerWrapper from "global/UI/LoadingSpinnerWrapper/LoadingSpinnerWrapper"
import { ExamplePageUrlParams } from "../ExampleArea.types";
import styles from "./ExamplePage.module.scss";

interface Props {
    
}

/**
 * Example page with loading spinner wrapper
 */
export default function ExamplePage(props: Props): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams<ExamplePageUrlParams>()

    return (
        <LoadingSpinnerWrapper isLoading={isLoading}>
            <h1 className={styles.heading}>This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   This is some crazy ass text!!!   </h1>
        </LoadingSpinnerWrapper>
    )
}
