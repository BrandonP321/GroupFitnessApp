import React from "react"
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import UserDashboard from "./UserDashboardScreen/UserDashboardScreen";
import { MainScreens } from "./MainScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { WorkoutScreens } from "~Flow/workout/WorkoutScreens";
import WorkoutFlow from "~Flow/workout/WorkoutFlow";
import { ProfileScreens } from "~Flow/profile/ProfileScreens";
import ProfileFlow from "~Flow/profile/ProfileFlow";
import MessageFlow from "~Flow/message/MessageFlow";
import { MessageScreens } from "~Flow/message/MessageScreens";
import WorkoutListScreen from "~Flow/workout/WorkoutListScreen/WorkoutListScreen";

const Tab = createBottomTabNavigator();

const MainFlowSharedScreenOptions: BottomTabNavigationOptions = {
    header: (props) => <HeaderWrapper {...props} rightBtnScreen={"settings"} showAppTitle/>,
}

const UserDashboardScreenOptions: BottomTabNavigationOptions = {
    title: "Dashboard"
}

const UserProfileFlowOptions: BottomTabNavigationOptions = {
    header: (props) => <HeaderWrapper {...props} rightBtnScreen={"settings"} showAppTitle/>,
    title: "Profile"
}

const MessagesFlowOptions: BottomTabNavigationOptions = {
    title: "Messages",
}

const WorkoutFlowOptions: BottomTabNavigationOptions = {
    header: () => null,
    tabBarButton: () => null,
    tabBarStyle: { display: "none" }
}

const WokroutListScreenOptions: BottomTabNavigationOptions = {
    title: "Workouts"
}

const MainFlow = () => {
    return (
        <Tab.Navigator initialRouteName={MainScreens.UserDashboard} screenOptions={MainFlowSharedScreenOptions}>
            <Tab.Screen name={MainScreens.UserDashboard} component={UserDashboard} options={UserDashboardScreenOptions}/>

            {
                // PROFILE FLOW
            }
            <Tab.Screen name={MainScreens.ProfileFlow} component={ProfileFlow} options={UserProfileFlowOptions}/>

            {
                // MESSAGES FLOW
            }
            <Tab.Screen name={MessageScreens.MessageFlow} component={MessageFlow} options={MessagesFlowOptions}/>

            {
                // WORKOUT FLOW
            }
            <Tab.Screen name={MainScreens.WorkoutList} component={WorkoutListScreen} options={WokroutListScreenOptions}/>
            <Tab.Screen name={WorkoutScreens.WorkoutFlow} component={WorkoutFlow} options={WorkoutFlowOptions}/>
        </Tab.Navigator>
    )
}

export default MainFlow