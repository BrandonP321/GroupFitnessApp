import React from "react"
import { View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, screens } from "~Navigation/Navigation"
import styles from "./LoginScreen.style"

export interface LoginScreenParamList {

}

interface LoginScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.Login>
    route: RouteProp<RootStackParamList, typeof screens.Login>
}

const LoginScreen = (props: LoginScreenProps) => {
    return (
        <View/>
    )
}

export default LoginScreen