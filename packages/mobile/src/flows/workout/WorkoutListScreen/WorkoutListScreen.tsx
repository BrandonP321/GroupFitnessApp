import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenProps, Screens } from "~Navigation/Screens";
import styles from "./WorkoutListScreen.style";
import TranslucentLoadingOverlay from "~Components/TranslucentLoadingOverlay/TranslucentLoadingOverlay";
import { useAppSelector } from "../../../features/hooks";
import mockData from "./mockData.json";
import WorkoutCard from "./components/WorkoutCard/WorkoutCard";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface WorkoutListScreenProps extends ScreenProps<typeof Screens.WorkoutList> {

}

const WorkoutListScreen = (props: WorkoutListScreenProps) => {
    const { params } = props.route;
    const { navigate } = props.navigation;

    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        // console.log(user.accessToken)
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.workoutList}>
            {mockData.map((w, i) => {
                return (
                    <WorkoutCard key={i} title={w.title} workoutId={"asdf"}/>
                )
            })}
        </ScrollView>
    )
}

export default WorkoutListScreen