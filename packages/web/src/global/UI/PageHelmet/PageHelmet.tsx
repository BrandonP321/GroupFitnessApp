import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

/* meta data for when page url is shared on social media */
interface SocialSharingMetaProps {
    socialTitle?: string;
    socialDescription?: string;
    /* should be 1.91:1 aspect ratio, < 1MB, and min 1200x630 resolution */
    socialImage?: string;
    imageAlt?: string;
    /* page user should be directed to */
    socialUrl?: string;
}

interface PageHelmetProps extends SocialSharingMetaProps {
    /* page title to be displayed in browser */
    title?: string;
    /* description for browsers and social media sharing */
    description?: string;
    /* robots meta tag tells browsers whether or not to index this page */
    robots?: "index" | "noindex";
    /* optional class to add to body element */
    bodyClassName?: string;
}

// TODO: replace this object with real data later
const defaultMeta: Omit<PageHelmetProps, "bodyClassName"> = {
    title: "Default Page Title",
    description: "Default page description",
    robots: "index",
    socialTitle: "Default Social Title",
    socialDescription: "Default social description",
    socialImage: "",
    socialUrl: "",
    imageAlt: ""
}

/**
 * Manages all changes to document head
 */
export default function PageHelmet(props: PageHelmetProps): ReactElement {
    const {
        title, description, robots, socialImage, socialDescription, socialUrl, socialTitle, bodyClassName, imageAlt
    } = props;

    return (
        <Helmet>
            {/* SEO */}
            <title>{title || defaultMeta.title}</title>
            <meta name={"description"} content={description || defaultMeta.description}/>
            <meta name={"robots"} content={robots || defaultMeta.robots}/>

            {/* SOCIAL SHARING */}
            <meta property={"og:title"} content={socialTitle || defaultMeta.socialTitle}/>
            <meta property={"og:description"} content={socialDescription || defaultMeta.socialDescription}/>
            <meta property={"og:image"} content={socialImage || defaultMeta.socialImage}/>
            <meta property={"og:title"} content={socialTitle || defaultMeta.socialTitle}/>
            {/* <meta property={"og:site_name"} content={}/> */}
            <meta property={"twitter:image:alt"} content={imageAlt || defaultMeta.imageAlt}/>
            {/* <meta property={"fb:app_id"} content={}/> */}
            {/* <meta property={"twitter:site"} content={}/> */}

            {/* HTML */}
            <body className={bodyClassName}/>
        </Helmet>
    )
}