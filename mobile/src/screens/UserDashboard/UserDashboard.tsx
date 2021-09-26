import React from "react"
import { View, Text, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, screens } from "../../global/navigation/Navigation"
import styles from "./UserDashboard.style"

interface UserDashboardProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.UserDashboard>
    route: RouteProp<RootStackParamList, typeof screens.UserDashboard>
}

const UserDashboard = (props: UserDashboardProps) => {
    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    )
}

export default UserDashboard