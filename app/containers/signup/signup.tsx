import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42PrimaryButton from "../../components/button/primary";
import C42TextInputWithIcon from "../../components/input/text-input-with-icon";
import C42SecureTextInput from "../../components/input/secure-text-input";
import { changeEmail, changePassword, changeFirstName, changeLastName, doSignup } from "../../redux/modules/auth/auth-reducer";
import { RootState } from "../../redux/root-reducer";
import { AuthState } from "../../redux/modules/auth/auth-types";
import { navigate } from "../../navigation/navigation";

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
  },
  successText: {
    fontSize: 14,
  },
  goToLoginContainer: {
    paddingTop: 20
  }
});

function renderSignupForm(dispatch: React.Dispatch<any>, authState: AuthState) {
  return (
    <>
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
        <C42SecureTextInput iconName={"lock-closed"} iconSize={22} iconColor={"grey"} placeholder={"Password"} value={authState.password} onChangeText={(text: string) => dispatch(changePassword(text))} />
      </View>
      <View>
        <C42PrimaryButton text={"Sign Up"} onPress={() => dispatch(doSignup(authState))}></C42PrimaryButton>
      </View>
    </>
  );
}

function renderSignupSuccess() {
  return <View>
    <Text style={styles.successText}>Signup is successful, Please check your email to activate your account ! </Text>
    <View style={styles.goToLoginContainer}>
      <C42PrimaryButton text={"Go to login"} onPress={() => navigate("LoginScreen", null)}></C42PrimaryButton>
    </View>
  </View>;
}

export default function SignupScreen(props:any): JSX.Element {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  return (<View style={styles.mainContainer} testID={"signup_form_container"}>
    <View style={styles.topContainer}>
      <Image source={require("../../images/computer_and_coffee.jpeg")} resizeMode={"center"} style={{ flex: 1 }}>
      </Image>
    </View>
    <View style={styles.bottomContainer}>
      {
        authState.signupSuccess ? renderSignupSuccess() : renderSignupForm(dispatch, authState)
      }
    </View>
  </View>);
}
