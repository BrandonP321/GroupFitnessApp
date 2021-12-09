import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList, Screens } from "~Navigation/Screens";
import styles from "./HeaderWrapper.style";

type RightHeaderBtnOptions = "settings"

interface HeaderWrapperProps extends BottomTabHeaderProps {
    showBackArrow?: boolean;
    /* if true, will hide screen title & back arrow to show app title */
    showAppTitle?: boolean;
    rightBtnScreen?: RightHeaderBtnOptions;
}

const HeaderWrapper = (props: HeaderWrapperProps) => {
    const { showBackArrow, showAppTitle, rightBtnScreen } = props;
    const { title } = props.options;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const rightBtnOptions: { [key in RightHeaderBtnOptions]: { icon: string; route: keyof RootStackParamList } } = {
        settings: { icon: "S", route: Screens.MainFlow }
    }

    const rightBtn = rightBtnScreen && rightBtnOptions[rightBtnScreen]

    const onRightBtnClick = () => {
        if (rightBtn) {
            const { route } = rightBtn;

            navigation.navigate(route, {});
        }
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.leftContent}>
                {showAppTitle 
                    ? <HeaderAppTitle/>
                    : showBackArrow && <HeaderBackArrow/>
                }
            </View>

            {!showAppTitle &&
                <View style={styles.centerTitleWrapper}>
                    <Text>{title}</Text>
                </View>
            }

            <View style={styles.rightContent}>
                <Text onPress={onRightBtnClick}>{rightBtn?.icon}</Text>
            </View>
        </View>
    )
}

const HeaderBackArrow: React.FC = (props) => {
    const navigation = useNavigation();

    return (
        // <View>
            <Text onPress={navigation.goBack}>{"<-"}</Text>
        // </View>
    )
}

const HeaderAppTitle: React.FC = (props) => {
    return (
        <Text>Group Fit App</Text>
    )
}

export default HeaderWrapper