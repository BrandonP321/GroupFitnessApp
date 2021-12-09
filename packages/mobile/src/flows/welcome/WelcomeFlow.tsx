import React from "react"
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "./LoginScreen/LoginScreen"
import MainFlow from "~Flow/main/MainFlow";
import { MainScreens } from "~Flow/main/MainScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { WelcomeScreens } from "./WelcomeScreens";

const Tab = createBottomTabNavigator();

const WelcomeFlowSharedScreenOptions: BottomTabNavigationOptions = {
    header: (props) => <HeaderWrapper {...props} showBackArrow={true}/>,
}

const SplashScreenOptions: BottomTabNavigationOptions = {

}

const LoginScreenOptions: BottomTabNavigationOptions = {

}

const MainFlowOptions: BottomTabNavigationOptions = {
    header: () => null
}

const WelcomeFlow = () => {
    return (
        <Tab.Navigator initialRouteName={WelcomeScreens.Login} screenOptions={WelcomeFlowSharedScreenOptions} tabBar={() => null}>
            <Tab.Screen name={WelcomeScreens.Login} component={LoginScreen} options={LoginScreenOptions}/>
            
            <Tab.Screen name={WelcomeScreens.MainFlow} component={MainFlow} options={MainFlowOptions}/>
        </Tab.Navigator>
    )
}

export default WelcomeFlow