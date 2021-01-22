import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { navigate } from '../../navigation/navigation';
import PrimaryButton from "../../components/button/primary";
import CommonButton from "../../components/button/common";

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

export default function DashboardScreen() {

    return (<SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text>DASHBOARD</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1 }}>
                    <PrimaryButton text={"Sign Up"}></PrimaryButton>
                </View>
                <View style={{ flex: 1 }}>
                    
                </View>
            </View>
        </View>
    </SafeAreaView>);
}