import * as React from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D8D8",
        backgroundColor: "#FFFFFF"
    },
    text: {
        color: "black"
    }
})

export default function component(props: any) {
    return <TextInput autoCapitalize={"none"} style={styles.input} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} placeholderTextColor={"gray"} onChangeText={props.onChangeText}></TextInput>
}