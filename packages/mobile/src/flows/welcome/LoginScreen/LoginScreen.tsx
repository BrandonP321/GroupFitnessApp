import React from "react"
import { View, Text } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, screens } from "~Navigation/Navigation"
import styles from "./LoginScreen.style"
import TextInputField from "~Components/TextInputField/TextInputField";
import { useState } from "hoist-non-react-statics/node_modules/@types/react"

export interface LoginScreenParamList {

}

interface LoginScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.Login>
    route: RouteProp<RootStackParamList, typeof screens.Login>
}

const LoginScreen = (props: LoginScreenProps) => {
    const [formValues, onInputChange] = useState({ email: "", password: "" });

    return (
        <View>
            <Text>Login</Text>
            <TextInputField label={"Email"} placeholder={"Email"} onChangeText={(text) => onInputChange({ ...formValues, email: text })}/>
        </View>
    )
}

export default LoginScreen