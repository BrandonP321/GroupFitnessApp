import React from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenProps, Screens } from "~Navigation/Screens";
import styles from "./ViewWorkout.style";
import mockData from "../WorkoutListScreen/mockData.json";
import ExerciseCard from "./components/ExerciseCard/ExerciseCard";

interface ViewWorkoutScreenProps extends ScreenProps<typeof Screens.ViewWorkout> {
    
}

const ViewWorkoutScreen = (props: ViewWorkoutScreenProps) => {
    const { params } = props.route

    console.log(params.workoutId);

    const workout = mockData[0];

    const { title, exercises } = workout

    return (
        <View>
            <Text>{title}</Text>
            {exercises.map((e, i) => {
                return <ExerciseCard name={e.name} key={i} rows={e.rows}/>
            })}
        </View>
    )
}

export default ViewWorkoutScreen