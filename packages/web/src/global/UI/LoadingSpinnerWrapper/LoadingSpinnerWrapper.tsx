import classNames from "classnames";
import { useAppSelector } from "features/hooks";
import React, { ReactElement, ReactNode } from "react";
import styles from "./LoadingSpinnerWrapper.module.scss";

interface LoadingSpinnerWrapperProps {
    children?: ReactNode;
}

/**
 * Wrapper for all content on the site, visibility controlled by redux state
 */
export default function LoadingSpinnerWrapper(props: LoadingSpinnerWrapperProps): ReactElement {
    const { children } = props;

    const { isLoading } = useAppSelector((state) => state.isLoading);

    const wrapperClasses = classNames(
        styles.contentWrapper,
        { [styles.loading]: isLoading }
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