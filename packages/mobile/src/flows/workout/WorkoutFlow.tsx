import React from "react"
import { WorkoutScreens } from "./WorkoutScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { View } from "react-native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import WorkoutListScreen from "./WorkoutListScreen/WorkoutListScreen";
import ViewWorkoutScreen from "./ViewWorkout/ViewWorkout";

const Stack = createNativeStackNavigator();

const WokroutFlowSharedScreenOptions: NativeStackNavigationOptions = {
    
}

const ViewWorkoutScreenOptions: NativeStackNavigationOptions = {

}

const WorkoutFlow = () => {
    return (
        <Stack.Navigator initialRouteName={WorkoutScreens.ViewWorkout} screenOptions={WokroutFlowSharedScreenOptions}>
            <Stack.Screen name={WorkoutScreens.ViewWorkout} component={ViewWorkoutScreen} options={ViewWorkoutScreenOptions}/>
        </Stack.Navigator>
    )
}

export default WorkoutFlow