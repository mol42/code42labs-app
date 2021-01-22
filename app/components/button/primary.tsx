import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    primary: {
        height: 40,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#1E59F5",
        justifyContent: "center",
        alignItems: "center"
    },
    text : {
        color : "white"
    }
})

export default function component(props: any) {
    return <Pressable style={styles.primary} onPress={props.onPress}><Text style={styles.text}>{props.text}</Text></Pressable>
}