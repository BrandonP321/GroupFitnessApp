import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen, { LoginScreenParamList } from "./LoginScreen/LoginScreen"
import SplashScreen, { SplashScreenParamList } from "./SplashScreen/SplashScreen";
import MainFlow, { mainScreens } from "../main/MainFlow";

export const welcomeScreens = {
    Splash: "Splash",
    Login: "Login"
} as const;

export type WelcomeScreensParamLists = {
    [welcomeScreens.Splash]: SplashScreenParamList
    [welcomeScreens.Login]: LoginScreenParamList
}

const Tab = createBottomTabNavigator();

const WelcomeFlow = () => {
    return (
        <Tab.Navigator initialRouteName={welcomeScreens.Splash}>
            <Tab.Screen name={welcomeScreens.Splash} component={SplashScreen} options={{}}/>
            <Tab.Screen name={welcomeScreens.Login} component={LoginScreen} options={{}}/>
            
            <Tab.Screen name={mainScreens.MainFlow} component={MainFlow} options={{}}/>
        </Tab.Navigator>
    )
}

export default WelcomeFlow