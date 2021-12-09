import { NavigatorScreenParams } from "@react-navigation/native";

export const SettingsScreens = {
    SettingsFlow: "SettingsFlow",
} as const;

export type SettingsScreensParamLists = {
}

export type SettingsFlowScreenParamList = NavigatorScreenParams<SettingsScreensParamLists>