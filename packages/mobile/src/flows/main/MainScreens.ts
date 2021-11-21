import { NavigatorScreenParams } from "@react-navigation/native";
import { RootStackParamList } from "~Navigation/Screens";

export const MainScreens = {
    MainFlow: "MainFlow",
    UserDashboard: "UserDashboard",
    UserProfile: "UserProfile",
    AllMessages: "AllMessages"
} as const;

export type MainFlowScreenParamList = NavigatorScreenParams<RootStackParamList>

export type UserDashboardScreenParamList = {
    userId: string
}

export type MainScreensParamLists = {
    [MainScreens.UserDashboard]: UserDashboardScreenParamList
}