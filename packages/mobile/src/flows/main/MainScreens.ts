import { NavigatorScreenParams } from "@react-navigation/native";
import { ProfileFlowScreenParamList } from "~Flow/profile/ProfileScreens";

export const MainScreens = {
    UserDashboard: "UserDashboard",
    WorkoutList: "WorkoutList",
    WorkoutFlow: "WorkoutFlow",
    ProfileFlow: "ProfileFlow"
} as const;

export type MainScreensParamLists = {
    [MainScreens.UserDashboard]: {
        userId: string
    };
    [MainScreens.WorkoutList]: undefined;
    // TODO: add user flow stack param list as type here
    [MainScreens.WorkoutFlow]: undefined;
    [MainScreens.ProfileFlow]: ProfileFlowScreenParamList;
}

export type MainFlowScreenParamList = NavigatorScreenParams<MainScreensParamLists>