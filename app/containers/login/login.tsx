import * as React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42PrimaryButton from "../../components/button/primary";
import C42TextInput from "../../components/input/text-input";
import { changeEmail, changePassword } from "../../redux/modules/auth/auth-reducer";
import { RootState } from "../../redux/root-reducer";

const styles = StyleSheet.create({
    safeArea : {
        flex: 1, 
        backgroundColor: "white"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    topContainer: {
        height: 280,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 2,
        paddingHorizontal: 32
    }
});

export default function LoginScreen() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    return (<SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "black" }}>LOGO HERE</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ paddingBottom: 10 }}>
                    <C42TextInput placeholder={"Email"} value={authState.email} onChangeText={(text: string) => dispatch(changeEmail(text))} />
                </View>
                <View style={{ paddingBottom: 20 }}>
                    <C42TextInput placeholder={"Password"} secureTextEntry={true} value={authState.password} onChangeText={(text: string) => dispatch(changePassword(text))} />
                </View>
                <View style={{ paddingBottom: 20, marginHorizontal: 8 }}>
                    <Text style={{ color: "black" }}>Forgot password ?</Text>
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <C42PrimaryButton text={"Sign Up"} onPress={() => alert(authState.email)}></C42PrimaryButton>
                </View>
            </View>
        </View>
    </SafeAreaView>);
}