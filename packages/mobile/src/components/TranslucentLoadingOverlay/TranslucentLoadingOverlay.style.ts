import { StyleSheet } from "react-native";
import { baseUi } from "~BaseUI"

export default StyleSheet.create({
    spinnerWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .5)",
    },
    showOverlay: {
        // display: "flex"
    },
    spinner: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: "rgba(0, 255, 255, 1)",
    },
});