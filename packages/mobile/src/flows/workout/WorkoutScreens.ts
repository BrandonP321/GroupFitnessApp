import { NavigatorScreenParams } from "@react-navigation/native";
import { RootStackParamList } from "~Navigation/Screens";

export const WorkoutScreens = {
    WorkoutFlow: "WorkoutFlow",
    ViewWorkout: "ViewWorkout"
} as const;

export type WorkoutScreensParamLists = {
    [WorkoutScreens.ViewWorkout]: {
        workoutId: string;
    };
}

export type WorkoutFlowScreenParamList = NavigatorScreenParams<WorkoutScreensParamLists>