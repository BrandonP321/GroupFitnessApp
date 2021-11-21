import React from "react"
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "./LoginScreen/LoginScreen"
import MainFlow from "~Flow/main/MainFlow";
import { MainScreens } from "~Flow/main/MainScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { welcomeScreens } from "./WelcomeScreens";

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
            <Tab.Screen name={welcomeScreens.Login} component={LoginScreen} options={LoginScreenOptions}/>
            
            <Tab.Screen name={MainScreens.MainFlow} component={MainFlow} options={MainFlowOptions}/>
        </Tab.Navigator>
    )
}

export default WelcomeFlow