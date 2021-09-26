import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import WelcomeFlow, { welcomeScreens, WelcomeScreensParamLists } from "../../flows/welcome/WelcomeFlow"
import { mainScreens, MainScreensParamLists } from "~Flow/main/MainFlow";

export type RootStackParamList = WelcomeScreensParamLists & MainScreensParamLists

export const screens = {
    ...welcomeScreens,
    ...mainScreens
} as const;

const Navigation = () => {
    return (
        <NavigationContainer>
            {/* all other flow navigators will be nested within the welcome flow */}
            <WelcomeFlow/>
        </NavigationContainer>
    )
}

export default Navigation