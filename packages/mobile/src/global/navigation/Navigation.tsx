import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import WelcomeFlow from "../../flows/welcome/WelcomeFlow"
import { useAppSelector } from "../../features/hooks";
import TranslucentLoadingOverlay from "~Components/TranslucentLoadingOverlay/TranslucentLoadingOverlay";

const Navigation = () => {
    

    return (
        <>
            {/* <TranslucentLoadingOverlay/> */}
            <NavigationContainer>
                {/* all other flow navigators will be nested within the welcome flow */}
                <WelcomeFlow/>
            </NavigationContainer>
        </>
    )
}

export default Navigation