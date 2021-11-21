import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import UserDashboard from "./UserDashboardScreen/UserDashboardScreen";
import { MainScreens } from "./MainScreens";

const Tab = createBottomTabNavigator();

const MainFlow = () => {
    return (
        <Tab.Navigator initialRouteName={MainScreens.UserDashboard} screenOptions={{ headerTitle: () => null }}>
            <Tab.Screen name={MainScreens.UserDashboard} component={UserDashboard} options={{}}/>
        </Tab.Navigator>
    )
}

export default MainFlow