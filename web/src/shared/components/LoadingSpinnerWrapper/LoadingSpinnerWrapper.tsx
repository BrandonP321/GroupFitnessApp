import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import styles from "./LoadingSpinnerWrapper.module.scss";

interface LoadingSpinnerWrapperProps {
    isLoading: boolean;
    children?: ReactNode;
}

/**
 * Wrapper for all the content on a page to optionally show a loading spinner when needed
 */
export default function LoadingSpinnerWrapper(props: LoadingSpinnerWrapperProps): ReactElement {
    const { isLoading, children } = props;

    const wrapperClasses = classNames(
        styles.contentWrapper,
        {
            [styles.loading]: isLoading
        }
    )

    return (
        <div className={wrapperClasses}>
            <div className={styles.spinnerWrapper}>
                <LoadingSpinner classes={{ spinner: styles.loadingSpinner }}/>
            </div>

            {children}
        </div>
    )
}

interface LoadingSpinnerProps {
    classes?: {
        spinner?: string;
    }
}

/**
 * Loading spinner icon
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { classes } = props;

    return (
        <div className={classNames(styles.spinner, classes?.spinner)}/>
    )
}