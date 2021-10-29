import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from "react-native";
import styles from "./HeaderWrapper.style";

interface HeaderWrapperProps extends BottomTabHeaderProps {
    showBackArrow?: boolean;
}

const HeaderWrapper = (props: HeaderWrapperProps) => {
    return (
        <View style={styles.headerWrapper}>
            <View style={styles.leftContent}>
                <Text>Left</Text>
            </View>
            <View style={styles.centerTitleWrapper}>
                <Text>Header Title</Text>
            </View>
            <View style={styles.rightContent}>
                <Text>Right</Text>
            </View>
        </View>
    )
}

export default HeaderWrapper