import { NavigatorScreenParams } from "@react-navigation/native";
import { MainScreensParamLists } from "~Flow/main/MainScreens";

export const welcomeScreens = {
    Login: "Login",
    MainFlow: "MainFlow"
} as const;

export interface LoginScreenParamList {
    
}

export type WelcomeScreensParamLists = {
    [welcomeScreens.Login]: LoginScreenParamList
    [welcomeScreens.MainFlow]: NavigatorScreenParams<MainScreensParamLists>
}