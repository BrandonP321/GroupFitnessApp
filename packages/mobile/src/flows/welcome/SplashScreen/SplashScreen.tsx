import React from "react"
import { View, Text } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, screens } from "~Navigation/Navigation"
import styles from "./SplashScreen.style"

export type SplashScreenParamList = {
}

interface SplashScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.Splash>
    route: RouteProp<RootStackParamList, typeof screens.Splash>
}

const SplashScreen = (props: SplashScreenProps) => {
    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    )
}

export default SplashScreen