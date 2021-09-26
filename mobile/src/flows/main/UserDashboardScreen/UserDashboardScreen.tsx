// import React from "react"
// import { View, Text } from "react-native"
// import { RouteProp } from "@react-navigation/native"
// import { NativeStackNavigationProp } from "@react-navigation/native-stack"
// import { RootStackParamList, screens } from "../../../global/navigation/Navigation"
// import styles from "./UserDashboard.style"

// export type UserDashboardScreenParamList = {
// }

// interface UserDashboardProps {
//     navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.UserDashboard>
//     route: RouteProp<RootStackParamList, typeof screens.UserDashboard>
// }

// const UserDashboard = (props: UserDashboardProps) => {
//     return (
//         <View>
//             <Text>User Dashboard</Text>
//         </View>
//     )
// }

// export default UserDashboard

import React from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, screens } from "../../../global/navigation/Navigation";
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