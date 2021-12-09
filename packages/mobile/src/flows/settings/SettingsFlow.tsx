import React from "react"
import { SettingsScreens } from "./SettingsScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const SettingsFlowSharedScreenOptions: NativeStackNavigationOptions = {

}

const SettingsFlow = () => {
    return (
        <Stack.Navigator initialRouteName={""} screenOptions={SettingsFlowSharedScreenOptions}>

        </Stack.Navigator>
    )
}

export default SettingsFlow