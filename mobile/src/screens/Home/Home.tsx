import React from "react"
import { View, Text, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack"
import styles from "./Home.style"
import { RootStackParamList, screens } from "../../global/navigation/Navigation"

const screenTransition: NativeStackNavigationOptions = {
    
}

interface HomeProps {
    // navigation: NativeStackNavigationProp<RootStackParamList, typeof screens.Home>
    // route: RouteProp<RootStackParamList, typeof screens.Home>
}

const Home = (props: HomeProps) => {
    return (
        <View>
            <Text>Home</Text>
            {/* <Button title={""} onPress={() => props.navigation.navigate(screens.Dashboard)}>Go To Dashboard</Button> */}
        </View>
    )
}

export default Home