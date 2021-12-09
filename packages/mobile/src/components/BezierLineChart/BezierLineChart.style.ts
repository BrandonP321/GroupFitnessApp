import { StyleSheet } from "react-native";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { baseUi } from "~BaseUI"

export const BezierChartConfig: AbstractChartConfig = {
    propsForLabels: {
        
    },
    labelColor: (opacity = 1) => "#000",
    // chart grid color
    color: () => "rgba(0, 0, 0, 0)",
    backgroundGradientFrom: "#000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    backgroundGradientTo: "#000",
    // shadow beneath line on graph
    fillShadowGradientOpacity: 0,
}

export default StyleSheet.create({
    lineChart: {
        alignSelf: "flex-end",
        borderWidth: 2,
        borderRightColor: "black",
        borderLeftColor: "black",
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    chartWrapper: {
        width: baseUi.contentWidth,
        alignSelf: "center",
        backgroundColor: "gray",
        borderRadius: 20,
        overflow: "hidden"
    }
});