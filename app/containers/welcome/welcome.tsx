import * as React from 'react';
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { navigate } from '../../navigation/navigation';
import C42PrimaryButton from "../../components/button/primary";
import C42CommonButton from "../../components/button/common";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black"
    },
    mainContainer: {
        flex: 1
    },
    topContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 2,
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 24
    }
});

export default function WelcomeScreen() {

    return (<ImageBackground source={require("../../images/office-home-computer-coffee.jpg")} resizeMode={"cover"} style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={{ padding: 8, backgroundColor: "rgba(50, 50, 50, 0.5)", borderRadius: 5 }}>
                    <Text style={{ fontSize: 42, fontWeight: "bold", color: "white" }}>Code42 Labs</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1 }}>
                    <C42PrimaryButton text={"Sign Up"} onPress={() => navigate("SignupScreen", null)}></C42PrimaryButton>
                </View>
                <View style={{ flex: 1 }}>
                    <C42CommonButton text={"Sign In"} onPress={() => navigate("LoginScreen", null)}></C42CommonButton>
                </View>
            </View>
        </View>
    </ImageBackground>);
}