import { MainScreens, MainScreensParamLists } from "~Flow/main/MainScreens";
import { welcomeScreens, WelcomeScreensParamLists } from "~Flow/welcome/WelcomeScreens";

export type RootStackParamList = WelcomeScreensParamLists & MainScreensParamLists

export const Screens = {
    ...welcomeScreens,
    ...MainScreens
} as const;