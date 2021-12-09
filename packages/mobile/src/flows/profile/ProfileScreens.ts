import { NavigatorScreenParams } from "@react-navigation/native";

export const ProfileScreens = {
    UserProfile: "UserProfile"
} as const;

export type ProfileScreensParamLists = {
    [ProfileScreens.UserProfile]: undefined;
}

export type ProfileFlowScreenParamList = NavigatorScreenParams<ProfileScreensParamLists>