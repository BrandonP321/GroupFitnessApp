import React from "react"
import { View, Text } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import styles from "./SplashScreen.style"
import { ScreenProps, Screens } from "~Navigation/Screens"

const SplashScreen = (props: {}) => {
    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    )
}

export default SplashScreen