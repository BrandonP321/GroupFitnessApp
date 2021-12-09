import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../utils/ScreenUtils";
import { baseUi, colors } from "~BaseUI";

const { vw } = ScreenUtils;

const btnHeight = 250;
const btnBorderRadius = 20;

export default StyleSheet.create({
    scrollWrapper: {
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: "center",
    },
    scrollOuterWrapper: {
        overflow: "visible"
    },
    scrollTitle: {
        fontSize: 20,
        marginLeft: baseUi.contentGutter,
        marginBottom: 10
    },
    scrollBtn: {
        marginRight: baseUi.contentGutter
    },
    btnContent: {
        position: "relative",
        height: btnHeight,
        width: 0.7 * vw,
        padding: 30,
        justifyContent: "flex-end",
        backgroundColor: colors.bodyBg,
        borderRadius: btnBorderRadius,
        // TODO: check these styles on IOS since elevation is what is used for android
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: { width: 10, height: -10 },
        elevation: 3,
    },
    btnGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: btnHeight / 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    btnBg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: btnBorderRadius,
        resizeMode: "cover"
    },
    firstBtn: {
        marginLeft: baseUi.contentGutter,
    },
    lastBtn: {

    },
    scrollBtnTitle: {
        color: "white"
    },
    scrollBtnSubtitle: {
        color: "white"
    },
    moreBtn: {
        height: btnHeight / 2,
        width: btnHeight / 2,
        marginRight: baseUi.contentGutter,
        borderRadius: 100,
        backgroundColor: "rgba(0, 0, 0, .2)",
        alignItems: "center",
        justifyContent: "center"
    }
});