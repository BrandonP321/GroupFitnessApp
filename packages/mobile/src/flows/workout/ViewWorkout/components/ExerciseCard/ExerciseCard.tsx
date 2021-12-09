import React from "react";
import { Text, View } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";
import styles from "./ExerciseCard.style";

export interface IExercise {
    name: string;
    rows: any[];
}

interface ExerciseCardProps extends IExercise {

}

const ExerciseCard = (props: ExerciseCardProps) => {
    const { name, rows } = props;

    const headRow = rows[0];
    const allRows = rows.slice(1);

    console.log(allRows);

    return (
        <View style={styles.exerciseCard}>
            <Text>{name}</Text>
            <View style={styles.exerciseTable}>
                {/* {rows?.map((col, i) => {
                    return (
                        
                    )
                })} */}
                <Table style={styles.exerciseTable} borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                    <Row data={headRow} style={styles.exerciseHeadRow}/>
                    <Rows data={allRows} style={styles.exerciseRow}/>
                </Table>
            </View>
        </View>
    )
}

export default ExerciseCard