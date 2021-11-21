import React, { useState, useEffect } from "react"
import { View, Text, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList, Screens } from "~Navigation/Screens"
import styles from "./LoginScreen.style"
import TextInputField from "~Components/TextInputField/TextInputField";
import { RegisterUser, LoginUser } from "@groupfitnessapp/common/src/api/requests/auth.requests";
import { StorageUtils } from "../../../../utils/StorageUtils"
import { useAppDispatch } from "../../../features/hooks"
import { storeAccessToken } from "../../../features/user/userSlice"
import { welcomeScreens } from "../WelcomeScreens"
import { MainScreens } from "~Flow/main/MainScreens"
import { hideScreenLoadingSpinner, showScreenLoadingSpinner } from "../../../features/screenLoading/screenLoadingSlice"
import { RegisterUserRequest, LoginUserErrResponse, RegisterUserErrResponse, RegisterUserErrors, LoginUserErrors } from "@groupfitnessapp/common/src/api/requests/auth.types"
import { RegexUtils } from "@groupfitnessapp/common/src/utils/RegexUtils";
import { AuthUtils, TAllRegistrationFields, TRegistrationErrFields, TRegistrationFields } from "@groupfitnessapp/common/src/utils/AuthUtils";

interface LoginScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, typeof Screens.Login>
    route: RouteProp<RootStackParamList, typeof Screens.Login>
}

const LoginScreen = (props: LoginScreenProps) => {
    const [showingLoginForm, setShowingLoginForm] = useState(true);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const showLoginForm = () => {
        setShowingLoginForm(true);
    }

    const showRegistrationForm = () => {
        setShowingLoginForm(false);
    }

    const navigateToDash = (userId: string) => {
        props.navigation.navigate(welcomeScreens.MainFlow, { 
            screen: MainScreens.UserDashboard,
            params: { userId }
        })
    }

    // securely store tokens and save access token in memory for easy access later
    const storeTokens = (accessToken: string, refreshToken: string, userId: string) => {
        StorageUtils.setBothTokens(accessToken, refreshToken)
        .then(isStored => {
            dispatch(storeAccessToken(accessToken))
            navigateToDash(userId)
        })
        .catch(err => {
            console.error("Error storing jwt in storage", err);
        })
        .finally(() => {
            dispatch(hideScreenLoadingSpinner());
        })
    }

    return (
        <View style={styles.loginScreen}>
            {errMsg &&
                <Text>{errMsg}</Text>
            }
            {showingLoginForm
                ? <LoginForm showRegistrationForm={showRegistrationForm} storeTokens={storeTokens} setErrMsg={setErrMsg}/>
                : <RegistrationForm showLoginForm={showLoginForm} storeTokens={storeTokens} setErrMsg={setErrMsg}/>
            }
        </View>
    )
}

interface ILoginForm {
    showRegistrationForm: () => void;
    setErrMsg: React.Dispatch<React.SetStateAction<string | null>>;
    storeTokens: (access: string, refresh: string, userId: string) => void;
}

const LoginForm: React.FC<ILoginForm> = ({ showRegistrationForm, storeTokens, setErrMsg }) => {
    const dispatch = useAppDispatch();

    const [formValues, onInputChange] = useState({ email: "", password: "" });

    useEffect(() => {
        // hide any warning message when user begins typing
        setErrMsg(null);
    }, [formValues])

    const attemptLogin = () => {
        dispatch(showScreenLoadingSpinner());

        LoginUser({}, formValues)
            .then(({ data }) => {
                // if login successful, store JSON web tokens and direct to dashboard
                storeTokens(data.accessToken, data.refreshToken, data.id)
            })
            .catch(({ response }: LoginUserErrResponse) => {
                switch(response.data.error) {
                    case LoginUserErrors.MissingUserInput:
                        setErrMsg(response.data.errMsg);
                        break;
                    case LoginUserErrors.IncorrectEmailOrPassword:
                        setErrMsg(response.data.errMsg);
                        break;
                    case LoginUserErrors.UnexpectedCondition:
                    default:
                        setErrMsg("An unexpected error has occurred.")
                        break;
                }

                dispatch(hideScreenLoadingSpinner());
            })
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInputField label={"Email"} placeholder={"Email"} onChangeText={(text: string) => onInputChange({ ...formValues, email: text })} />
            <TextInputField label={"Password"} placeholder={"Password"} onChangeText={(text: string) => onInputChange({ ...formValues, password: text })} />
            <Button title={"Login"} onPress={attemptLogin} />
            <Text>{"Don't have an account? "}<Text onPress={showRegistrationForm}>Register Now</Text></Text>
        </View>
    )
}

interface IRegistrationForm {
    showLoginForm: () => void;
    storeTokens: (access: string, refresh: string, userId: string) => void;
    setErrMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const RegistrationForm: React.FC<IRegistrationForm> = ({ showLoginForm, storeTokens, setErrMsg }) => {
    const dispatch = useAppDispatch();

    const [errField, setErrField] = useState<TRegistrationErrFields | null>(null)

    const [formValues, onInputChange] = useState<TAllRegistrationFields>({
        email: "emai@email.com",
        password: "Password321",
        passwordReEnter: "Password321",
        fullName: "Brandon Phillips",
        username: "brp32",
        phone: "4066716723",
    });

    useEffect(() => {
        // hide any warning message when user begins typing
        setErrMsg(null);
    }, [formValues])

    const attemptRegister = () => {
        const errObj = AuthUtils.validateRegistrationFields(formValues);

        // alert user if there was an input error
        if (errObj) {
            setErrMsg(errObj.msg);
            setErrField(errObj.field);
            return
        }

        dispatch(showScreenLoadingSpinner());

        RegisterUser({}, formValues)
            .then(({ data }) => {
                storeTokens(data.accessToken, data.refreshToken, data.id);
            })
            .catch(({ response }: RegisterUserErrResponse) => {

                switch(response.data.error) {
                    case RegisterUserErrors.InvalidUserInput:
                        setErrMsg(response.data.errMsg)
                        setErrField(response.data.field)
                        break;
                    case RegisterUserErrors.EmailOrUsernameTaken:
                        setErrMsg(response.data.errMsg);
                        setErrField(response.data.credTaken);
                        break;
                    case RegisterUserErrors.UnexpectedCondition:
                    default:
                        setErrMsg("An unexpected error occurred during registration.")
                        break;
                }

                dispatch(hideScreenLoadingSpinner());
            })
    }

    return (
        <View>
            <Text>Register</Text>
            <TextInputField label={"Email"} placeholder={"Email"} onChangeText={(text: string) => onInputChange({ ...formValues, email: text })} />
            <TextInputField label={"Password"} placeholder={"Password"} onChangeText={(text: string) => onInputChange({ ...formValues, password: text })} />
            <TextInputField label={"Re-Enter Password"} placeholder={"Re-Enter Password"} onChangeText={(text: string) => onInputChange({ ...formValues, passwordReEnter: text })} />
            <TextInputField label={"Full Name"} placeholder={"Full Name"} onChangeText={(text: string) => onInputChange({ ...formValues, fullName: text })} />
            <TextInputField label={"Username"} placeholder={"Username"} onChangeText={(text: string) => onInputChange({ ...formValues, username: text })} />
            <TextInputField label={"Phone"} placeholder={"Phone"} onChangeText={(text: string) => onInputChange({ ...formValues, phone: text })} />
            <Button title={"Register"} onPress={attemptRegister} />
            <Text>{"Already have an account? "}<Text onPress={showLoginForm}>Login Here</Text></Text>
        </View>
    )
}

export default LoginScreen