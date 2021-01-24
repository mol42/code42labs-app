import * as React from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42PrimaryButton from "../../components/button/primary";
import C42TextInputWithIcon from "../../components/input/text-input-with-icon";
import { changeEmail, changePassword, doLogin } from "../../redux/modules/auth/auth-reducer";
import { RootState } from "../../redux/root-reducer";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    topContainer: {
        height: 320,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 2,
        paddingTop: 40,
        paddingHorizontal: 32
    }
});

export default function LoginScreen() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Image source={require("../../images/desktop-with-computer-coffee-cup.jpg")} resizeMode={"stretch"} style={{ flex: 1 }}>

                </Image>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ paddingBottom: 10 }}>
                    <C42TextInputWithIcon iconName={"at-circle-sharp"} iconSize={22} iconColor={"grey"} placeholder={"Email"} value={authState.email} onChangeText={(text: string) => dispatch(changeEmail(text))} />
                </View>
                <View style={{ paddingBottom: 15 }}>
                    <C42TextInputWithIcon iconName={"lock-closed"} iconSize={22} iconColor={"grey"} placeholder={"Password"} secureTextEntry={true} value={authState.password} onChangeText={(text: string) => dispatch(changePassword(text))} />
                </View>
                <View style={{ paddingBottom: 30 }}>
                    <C42PrimaryButton text={"Sign In"} onPress={() => dispatch(doLogin(authState))}></C42PrimaryButton>
                </View>
                <View style={{ marginHorizontal: 8 }}>
                    <Text style={{ color: "black" }}>Forgot password ?</Text>
                </View>
            </View>
        </View>);
}