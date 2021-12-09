import { StyleSheet } from "react-native";
import { baseUi } from "../../../../src/styles/baseUi.style";
import { ScreenUtils } from "../../../../utils/ScreenUtils";

const msgBtnHeight = 150;
const msgBtnWidth = msgBtnHeight;
const msgBtnBorderRadius = msgBtnHeight / 2;

const { vw } = ScreenUtils;

export default StyleSheet.create({
    msgScrollBtn: {
        marginRight: baseUi.contentGutter
    },
    firstBtn: {
        marginLeft: baseUi.contentGutter
    },
    msgBtnBg: {
        height: msgBtnHeight,
        width: msgBtnWidth,
        borderRadius: msgBtnBorderRadius,
    },
    msgBtnTitle: {
        width: msgBtnWidth,
        textAlign: "center",
        marginTop: 20
    },
    dashboardScrollView: {
        paddingBottom: 30
    }
});