import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { RootStackParamList, Screens } from "~Navigation/Screens";
import styles from "./WorkoutCard.style";

interface WorkoutCardProps {
    workoutId: string;
    title: string;

}

export default function WorkoutCard(props: WorkoutCardProps): ReactElement {
    const { title, workoutId } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCardClick = () => {
        navigation.navigate(Screens.WorkoutFlow, {
            screen: Screens.ViewWorkout,
            params: { workoutId }
        })
    }

    return (
        <Pressable style={styles.workoutCard} onPress={handleCardClick}>
            <Text style={styles.workoutTitle}>{title}</Text>
        </Pressable>
    )
}