import React from "react"
import { ProfileScreens } from "./ProfileScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ProfileFlowSharedScreenOptions: NativeStackNavigationOptions = {

}

const ProfileFlow = () => {
    return (
        <Stack.Navigator initialRouteName={""} screenOptions={ProfileFlowSharedScreenOptions}>

        </Stack.Navigator>
    )
}

export default ProfileFlow