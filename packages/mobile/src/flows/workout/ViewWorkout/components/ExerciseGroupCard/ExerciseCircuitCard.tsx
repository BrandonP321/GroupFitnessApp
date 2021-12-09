import React from "react";
import { View, Text } from "react-native";
import { IExercise } from "../ExerciseCard/ExerciseCard";
import styles from "./ExerciseCircuitCard.style";

interface ExerciseCircuitCardProps {
    circuitName: string;
    exercises: IExercise[];
}

const ExerciseCircuitCard = (props: ExerciseCircuitCardProps) => {
    const { circuitName, exercises } = props;

    return (
        <View style={styles.circuitCard}>
            <Text></Text>
        </View>
    )
}

export default ExerciseCircuitCard