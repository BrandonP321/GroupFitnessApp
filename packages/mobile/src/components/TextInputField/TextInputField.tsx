import React from "react";
import { TextInput, View, Text } from "react-native";
import styles from "./TextInputField.style";

export type TextInputFieldScreenParamList = {
}

interface TextInputFieldProps {
    label?: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
}

const TextInputField = (props: TextInputFieldProps) => {
    const {
        label, placeholder, onChangeText
    } = props;

    return (
        <View>
            {label &&
                <Text>{label}</Text>
            }
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}/>
        </View>
    )
}

export default TextInputField