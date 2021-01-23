import * as React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#D8D8D8",
    },
    input: {
        padding: 5,
        paddingVertical : 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#FFFFFF"
    },
    text: {
        color: "black"
    }
})

export default function component(props: any) {
    return <View style={styles.container}>
        <Ionicons name={props.iconName} size={props.iconSize} color={props.iconColor} />
        <TextInput autoCapitalize={"none"} style={styles.input} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} placeholderTextColor={"gray"} onChangeText={props.onChangeText}></TextInput>
    </View>

}