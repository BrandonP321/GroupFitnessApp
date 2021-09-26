import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import UserDashboard, { UserDashboardScreenParamList } from "./UserDashboard/UserDashboard";

export const mainScreens = {
    MainFlow: "MainFlow",
    UserDashboard: "UserDashboard",
} as const;

export type MainScreensParamLists = {
    [mainScreens.UserDashboard]: UserDashboardScreenParamList
}

const Tab = createBottomTabNavigator();

const WelcomeFlow = () => {
    return (
        <Tab.Navigator initialRouteName={mainScreens.UserDashboard}>
            <Tab.Screen name={mainScreens.UserDashboard} component={UserDashboard} options={{}}/>
        </Tab.Navigator>
    )
}

export default WelcomeFlow