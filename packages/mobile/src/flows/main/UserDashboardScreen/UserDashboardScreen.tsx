import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "~Navigation/Screens";
import styles from "./UserDashboardScreen.style";
import TranslucentLoadingOverlay from "~Components/TranslucentLoadingOverlay/TranslucentLoadingOverlay";
import { useAppSelector } from "../../../features/hooks";

interface UserDashboardScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof Screens.UserDashboard>
    route: RouteProp<RootStackParamList, typeof Screens.UserDashboard>
}

const UserDashboardScreen = (props: UserDashboardScreenProps) => {
    const { params } = props.route;
    const { navigate } = props.navigation
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        console.log(params?.userId)
        console.log(user.accessToken)
    }, [])

    return (
        <ScrollView>
            <Text style={styles.text}>TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST </Text>
        </ScrollView>
    )
}

export default UserDashboardScreen