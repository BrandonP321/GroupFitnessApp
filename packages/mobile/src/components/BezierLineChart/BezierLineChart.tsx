import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { baseUi } from "~BaseUI";
import styles, { BezierChartConfig } from "./BezierLineChart.style";
import { DateUtils } from "@groupfitnessapp/common/src/utils/DateUtils";
import { IUserWeight, UserUtils } from "../../../utils/UserUtils";
import { ScreenUtils } from "utils/ScreenUtils";
import Svg, { Polyline } from "react-native-svg";

interface BezierLineChartProps {
    // data: LineChartData
}

const mockWeightData: IUserWeight[] = [
    {
        date: { month: 9, day: 20, year: 2021 },
        weight: { value: 235, unit: "lbs" }
    },
    {
        date: { month: 10, day: 5, year: 2021 },
        weight: { value: 210, unit: "lbs" }
    },
    {
        date: { month: 10, day: 29, year: 2021 },
        weight: { value: 199, unit: "lbs" }
    },
]

// console.log(UserUtils.getUserWeightMetricData([], 3));
const userWeight = UserUtils.getUserWeightMetricData(mockWeightData, 3)

console.log(userWeight.metricTimeline, userWeight.maxWeight, userWeight.minWeight)

// const tempData: LineChartData = {
//     labels: ["lab 1", "lab 4", "lab 3", "lab 3", "lab 3"],
//     datasets: [
//         {
//             data: [5, 2, 10],
//             // data point color
//             color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
//             strokeWidth: 2,
//         },
//         {
//             data: [2, 5, 4],
//             // data point color
//             color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
//             strokeWidth: 2,
//         },
//     ]
// }

{/* <LineChart
            data={tempData}
            width={baseUi.contentWidth}
            height={300}
            chartConfig={BezierChartConfig}
            style={styles.lineChart}
            hidePointsAtIndex={[]}
            bezier
        /> */}

const BezierLineChart = (props: BezierLineChartProps) => {
    const [allGraphPoints, setAllGraphPoints] = useState<string | null>(null);
    const maxYValue = Math.ceil(userWeight.maxWeight / 10) * 10;
    const minYValue = Math.floor(userWeight.minWeight / 10) * 10;
    const svgWidth = baseUi.contentWidth - 30;
    const svgHeight = (svgWidth * 1) - 30;


    useEffect(() => {
        const graphPoints: string[] = []

        userWeight.metricTimeline.forEach((m, i) => {
            if (m) {
                const xPercent = i / userWeight.metricTimeline.length;
                const yPercent = (maxYValue - m.weight.value) / (maxYValue - minYValue);

                const point = `${xPercent * svgWidth},${yPercent * svgHeight}`;
                graphPoints.push(point);
            }
        })

        setAllGraphPoints(graphPoints.join(" "));
    }, [])

    useEffect(() => {

    }, [allGraphPoints])


    return (
        <View style={styles.chartWrapper}>
            <View style={styles.lineChart}>
                <Svg height={svgHeight} width={svgWidth}>
                    <Polyline
                        points={allGraphPoints ?? ""}
                        fill={"none"}
                        stroke={"black"}
                        strokeWidth={"3"}
                        
                    />
                </Svg>
            </View>
        </View>
    )
}

export default BezierLineChart