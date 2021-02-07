import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/modules/auth/auth-reducer";
import C42PrimaryButton from "../../components/button/primary";

const styles = StyleSheet.create({
    safeArea: {
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

export default function SkillsScreen() {
    const dispatch = useDispatch();

    return (<SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
            <Text style={{color:"white"}}> SETTINGS</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1 }}>
                    
                </View>
            </View>
        </View>
    </SafeAreaView>);
}