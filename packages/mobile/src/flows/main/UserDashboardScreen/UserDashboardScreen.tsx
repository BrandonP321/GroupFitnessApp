import React, { useEffect } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenProps, Screens } from "~Navigation/Screens";
import styles from "./UserDashboardScreen.style";
import { useAppSelector } from "../../../features/hooks";
import HorizontalScrollingBtns from "~Components/HorizontalScrollingBtns/HorizontalScrollingBtns";
import BezierLineChart from "~Components/BezierLineChart/BezierLineChart";

const onClick = () => {
    console.log("click");
}

const tempImg = "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

const mockWorkoutBtns = [
    { title: "Workout 1", subtitle: "This is a pretty dope workout if you ask me", bgImg: tempImg, detail: "asdf" },
    { title: "Workout 2", subtitle: "This is a pretty dope workout if you ask me", bgImg: tempImg, detail: "asdf1" },
    { title: "Workout 3", subtitle: "This is a pretty dope workout if you ask me", bgImg: tempImg, detail: "asdf2" },
    { title: "Workout 4", subtitle: "This is a pretty dope workout if you ask me", bgImg: tempImg, detail: "asdf3" },
]

const mockMsgBtns = [
    { title: "Person 1", bgImg: tempImg, detail: "msg1" },
    { title: "Person 2", bgImg: tempImg, detail: "msg2" },
    { title: "Person 3", bgImg: tempImg, detail: "msg3" },
    { title: "Person 4", bgImg: tempImg, detail: "msg4" },
]

interface UserDashboardScreenProps extends ScreenProps<typeof Screens.UserDashboard> {

}

const UserDashboardScreen = (props: UserDashboardScreenProps) => {
    const { params } = props.route;
    const { navigate } = props.navigation;

    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        console.log(params?.userId)
        console.log(user.accessToken)
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.dashboardScrollView}>

            <HorizontalScrollingBtns 
            btns={mockWorkoutBtns} 
            scrollTitle={"Recent Workouts"}
            onMoreBtnClick={() => console.log("MORE")}
            onBtnClick={(workoutId: string) => console.log(workoutId)}/>

            <HorizontalScrollingBtns
                btns={mockMsgBtns}
                scrollTitle={"Recent Messages"}
                onBtnClick={(msgId: string) => {
                    console.log(msgId)
                }}
                onMoreBtnClick={() => console.log("More messages")}
                CustomBtnComponent={({ title, bgImg, onClick, index }) => {
                    const isFirstBtn = index === 0;

                    const btnStyles = [
                        styles.msgScrollBtn,
                        isFirstBtn && styles.firstBtn
                    ]

                    return (
                        <Pressable onPress={onClick} style={btnStyles} key={index}>
                            <Image source={{ uri: bgImg }} style={styles.msgBtnBg}/>
                            <Text style={styles.msgBtnTitle}>{title}</Text>
                        </Pressable>
                    )
                }}
            />

            <BezierLineChart/>

        </ScrollView>
    )
}

export default UserDashboardScreen