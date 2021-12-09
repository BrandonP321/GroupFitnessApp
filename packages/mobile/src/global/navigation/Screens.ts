import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainScreens, MainScreensParamLists } from "~Flow/main/MainScreens";
import { MessageScreens, MessageScreensParamLists } from "~Flow/message/MessageScreens";
import { ProfileScreens, ProfileScreensParamLists } from "~Flow/profile/ProfileScreens";
import { SettingsScreens, SettingsScreensParamLists } from "~Flow/settings/SettingsScreens";
import { WelcomeScreens, WelcomeScreensParamLists } from "~Flow/welcome/WelcomeScreens";
import { WorkoutScreens, WorkoutScreensParamLists } from "~Flow/workout/WorkoutScreens";

export type RootStackParamList = WelcomeScreensParamLists & MainScreensParamLists & ProfileScreensParamLists & MessageScreensParamLists & SettingsScreensParamLists & WorkoutScreensParamLists

export type ScreenProps<screen extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, screen>;
    route: RouteProp<RootStackParamList, screen>
}

export const Screens = {
    ...WelcomeScreens,
    ...MainScreens,
    ...WorkoutScreens,
    ...ProfileScreens,
    ...MessageScreens,
    ...SettingsScreens
} as const;