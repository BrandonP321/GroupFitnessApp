import React, { useState } from "react"
import { Text, View } from "react-native"
import { useAppSelector } from "../../features/hooks";
import styles from "./TranslucentLoadingOverlay.style";

interface ITranslucentLoadingOverlay {

}

const TranslucentLoadingOverlay: React.FC<ITranslucentLoadingOverlay> = (props) => {
    const { isLoading } = useAppSelector((state) => state.isLoading);

    return (
        isLoading
            ?   <View style={[styles.spinnerWrapper, isLoading && styles.showOverlay]}>
                    <View style={styles.spinner}/>
                </View>
            :   null
    )
}

export default TranslucentLoadingOverlay;