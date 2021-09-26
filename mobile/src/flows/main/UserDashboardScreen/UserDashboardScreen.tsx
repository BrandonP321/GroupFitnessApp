import React from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, screens } from "~Navigation/Navigation";
import styles from "./UserDashboardScreen.style";

export type UserDashboardScreenParamList = {
}

interface UserDashboardScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.UserDashboard>
    route: RouteProp<RootStackParamList, typeof screens.UserDashboard>
}

const UserDashboardScreen = (props: UserDashboardScreenProps) => {
    return (
        <View/>
    )
}

export default UserDashboardScreen