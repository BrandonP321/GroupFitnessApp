import { NavigatorScreenParams } from "@react-navigation/native";
import { RootStackParamList } from "~Navigation/Screens";

export const MessageScreens = {
    MessageFlow: "MessageFlow",
} as const;

export type MessageFlowScreenParamList = NavigatorScreenParams<RootStackParamList>

export type MessageScreensParamLists = {
}