import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, screens } from "~Navigation/Navigation"
import styles from "./LoginScreen.style"
import TextInputField from "~Components/TextInputField/TextInputField";
import { RegisterUser, LoginUser } from "@groupfitnessapp/common/src/api/requests/auth.requests";

export interface LoginScreenParamList {

}

interface LoginScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.Login>
    route: RouteProp<RootStackParamList, typeof screens.Login>
}

const LoginScreen = (props: LoginScreenProps) => {
    const [showingLoginForm, setShowingLoginForm] = useState(true);

    const showLoginForm = () => {
        setShowingLoginForm(true);
    }

    const showRegistrationForm = () => {
        setShowingLoginForm(false);
    }

    return (
        <View style={styles.loginScreen}>
            {showingLoginForm
                ? <LoginForm showRegistrationForm={showRegistrationForm}/>
                : <RegistrationForm showLoginForm={showLoginForm}/>
            }
        </View>
    )
}

const LoginForm: React.FC<{ showRegistrationForm: () => void }> = ({ showRegistrationForm }) => {
    const [formValues, onInputChange] = useState({ email: "", password: "" });

    const attemptLogin = () => {
        console.log(formValues);

        LoginUser({}, { email: formValues.email, password: formValues.password }).then(({ data }) => {
            console.log(data)
        })
    }
    
    return (
        <View>
            <Text>Login</Text>
            {/* <TextInputField label={"Email"} placeholder={"Email"} onChangeText={(text: string) => onInputChange({ ...formValues, email: text })} /> */}
            <Button title={"Login"} onPress={attemptLogin} />
            <Text>{"Don't have an account? "}<Text onPress={showRegistrationForm}>Register Now</Text></Text>
        </View>
    )
}

const RegistrationForm: React.FC<{ showLoginForm: () => void }> = ({ showLoginForm }) => {
    const [formValues, onInputChange] = useState({ email: "", password: "" });

    return (
        <View>
            <Text>Register</Text>
            {/* <TextInputField label={"Email"} placeholder={"Email"} onChangeText={(text: string) => onInputChange({ ...formValues, email: text })} /> */}
            <Button title={"Login"} onPress={showLoginForm} />
            <Text>{"Already have an account? "}<Text onPress={showLoginForm}>Login Here</Text></Text>
        </View>
    )
}

export default LoginScreen