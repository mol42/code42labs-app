import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42PrimaryButton from "../../components/button/primary";
import C42TextInputWithIcon from "../../components/input/text-input-with-icon";
import { changeEmail, changePassword, changeFirstName, changeLastName, doSignup } from "../../redux/modules/auth/auth-reducer";
import { RootState } from "../../redux/root-reducer";

const styles = StyleSheet.create({
    safeArea: {
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
        paddingTop: 40,
        paddingHorizontal: 32
    }
});

export default function SignupScreen() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    return (<View style={styles.mainContainer}>
        <View style={styles.topContainer}>
            <Image source={require("../../images/computer_and_coffee.jpeg")} resizeMode={"center"} style={{ flex: 1 }}>

            </Image>
        </View>
        <View style={styles.bottomContainer}>
            <View style={{ paddingBottom: 10 }}>
                <C42TextInputWithIcon iconName={"person"} iconSize={22} iconColor={"grey"} placeholder={"First Name"} value={authState.email} onChangeText={(text: string) => dispatch(changeFirstName(text))} />
            </View>
            <View style={{ paddingBottom: 10 }}>
                <C42TextInputWithIcon iconName={"person"} iconSize={22} iconColor={"grey"} placeholder={"Last Name"} value={authState.email} onChangeText={(text: string) => dispatch(changeLastName(text))} />
            </View>
            <View style={{ paddingBottom: 10 }}>
                <C42TextInputWithIcon iconName={"at-circle-sharp"} iconSize={22} iconColor={"grey"} placeholder={"Email"} value={authState.email} onChangeText={(text: string) => dispatch(changeEmail(text))} />
            </View>
            <View style={{ paddingBottom: 30 }}>
                <C42TextInputWithIcon iconName={"lock-closed"} iconSize={22} iconColor={"grey"} placeholder={"Password"} secureTextEntry={true} value={authState.password} onChangeText={(text: string) => dispatch(changePassword(text))} />
            </View>
            <View>
                <C42PrimaryButton text={"Sign Up"} onPress={() => dispatch(doSignup(authState))}></C42PrimaryButton>
            </View>
        </View>
    </View>);
}