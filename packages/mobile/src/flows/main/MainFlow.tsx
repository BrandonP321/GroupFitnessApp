import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import UserDashboard, { UserDashboardScreenParamList } from "./UserDashboardScreen/UserDashboardScreen";

export const mainScreens = {
    MainFlow: "MainFlow",
    UserDashboard: "UserDashboard",
    UserProfile: "UserProfile",
    AllMessages: "AllMessages"
} as const;

export type MainScreensParamLists = {
    [mainScreens.UserDashboard]: UserDashboardScreenParamList
}

const Tab = createBottomTabNavigator();

const MainFlow = () => {
    return (
        <Tab.Navigator initialRouteName={mainScreens.UserDashboard} screenOptions={{ headerTitle: () => null }}>
            <Tab.Screen name={mainScreens.UserDashboard} component={UserDashboard} options={{}}/>
        </Tab.Navigator>
    )
}

export default MainFlow