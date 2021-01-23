import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { navigate } from '../../navigation/navigation';
import C42PrimaryButton from "../../components/button/primary";
import C42CommonButton from "../../components/button/common";

const styles = StyleSheet.create({
    safeArea : {
        flex: 1, 
        backgroundColor: "black"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "black"
    },
    topContainer: {
        flex: 5
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

    return (<SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text>LOGO HERE</Text>
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
    </SafeAreaView>);
}