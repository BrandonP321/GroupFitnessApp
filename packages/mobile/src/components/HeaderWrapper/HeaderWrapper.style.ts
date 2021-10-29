import { StyleProp, StyleSheet, StyleSheetProperties } from "react-native";
import { baseUi } from "~BaseUI"

// const leftAndRightContent = StyleSheet.create({
    
// });

const sharedStyles = StyleSheet.create({
    leftAndRightContent: {

    }
})

const {
    leftAndRightContent
} = sharedStyles;

export default StyleSheet.create({
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingRight: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        height: 100
    },
    leftContent: {
        ...leftAndRightContent
    },
    rightContent: {
        ...leftAndRightContent,
    },
    centerTitleWrapper: {

    }
});