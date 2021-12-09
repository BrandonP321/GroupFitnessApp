import { NavigatorScreenParams } from "@react-navigation/native";
import { MainFlowScreenParamList } from "~Flow/main/MainScreens";

export const WelcomeScreens = {
    Login: "Login",
    MainFlow: "MainFlow"
} as const;

export type WelcomeScreensParamLists = {
    // [WelcomeScreens.WelcomeFlow]: 
    [WelcomeScreens.Login]: undefined
    [WelcomeScreens.MainFlow]: MainFlowScreenParamList
}

// TODO: where to put flow param list?
export type WelcomeFlowScreenParamList = NavigatorScreenParams<WelcomeScreensParamLists>