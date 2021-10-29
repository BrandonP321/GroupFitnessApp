import React from "react"
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen, { LoginScreenParamList } from "./LoginScreen/LoginScreen"
import SplashScreen, { SplashScreenParamList } from "./SplashScreen/SplashScreen";
import MainFlow, { mainScreens } from "~Flow/main/MainFlow";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";

export const welcomeScreens = {
    Splash: "Splash",
    Login: "Login"
} as const;

export type WelcomeScreensParamLists = {
    [welcomeScreens.Splash]: SplashScreenParamList
    [welcomeScreens.Login]: LoginScreenParamList
}

const Tab = createBottomTabNavigator();

const WelcomeFlowSharedScreenOptions: BottomTabNavigationOptions = {
    header: (props) => <HeaderWrapper {...props} showBackArrow={true}/>,
}

const SplashScreenOptions: BottomTabNavigationOptions = {

}

const LoginScreenOptions: BottomTabNavigationOptions = {

}

const MainFlowOptions: BottomTabNavigationOptions = {

}

const WelcomeFlow = () => {
    return (
        <Tab.Navigator initialRouteName={welcomeScreens.Login} screenOptions={WelcomeFlowSharedScreenOptions} tabBar={() => null}>
            <Tab.Screen name={welcomeScreens.Splash} component={SplashScreen} options={SplashScreenOptions}/>
            <Tab.Screen name={welcomeScreens.Login} component={LoginScreen} options={LoginScreenOptions}/>
            
            <Tab.Screen name={mainScreens.MainFlow} component={MainFlow} options={MainFlowOptions}/>
        </Tab.Navigator>
    )
}

export default WelcomeFlow