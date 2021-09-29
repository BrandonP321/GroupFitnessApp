import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";
import styles from "./PageWrapper.module.scss";

// TODO: replace this object with real data later
const defaultMeta = {
    title: "Default Page Title",
    image: "https://i.imgur.com/MG941od.png",
    description: "Default page description"
}

interface PageHelmetProps {
    /* page title to be displayed in browser */
    title?: string;
    /* image used when page url is shared on social platforms */
    image?: string;
    /* description for browsers and social media sharing */
    description?: string;
    /* optional class to add to body element */
    bodyClassName?: string;
}

/**
 * Manages all changes to document head
 */
// TODO: look at using new npm package for this since react-helmet is throwing errors in console
export default function PageHelmet(props: PageHelmetProps): ReactElement {
    const {
        title, image, description
    } = props;

    return (
        <Helmet>
            <title>{title || defaultMeta.title}</title>

            <body className={props.bodyClassName}/>
        </Helmet>
    )
}