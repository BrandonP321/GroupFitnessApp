import React from "react"
import { MessageScreens } from "./MessageScreens";
import HeaderWrapper from "~Components/HeaderWrapper/HeaderWrapper";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MessageFlowSharedScreenOptions: NativeStackNavigationOptions = {

}

const MessageFlow = () => {
    return (
        <Stack.Navigator initialRouteName={""} screenOptions={MessageFlowSharedScreenOptions}>

        </Stack.Navigator>
    )
}

export default MessageFlow