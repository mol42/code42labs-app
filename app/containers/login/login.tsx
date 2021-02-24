import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42PrimaryButton from "../../components/button/primary";
import C42TextInputWithIcon from "../../components/input/text-input-with-icon";
import {
  changeEmail,
  changePassword,
  doLogin,
} from "../../redux/modules/auth/auth-reducer";
import { RootState } from "../../redux/root-reducer";
import { I18nContext } from "../../config/i18n";
import { AntDesign } from "@expo/vector-icons";
import { goBack } from "../../navigation/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: 320,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 2,
    paddingTop: 40,
    paddingHorizontal: 32,
  },
});

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const polyglot = I18nContext.polyglot;
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image
          source={require("../../images/desktop-with-computer-coffee-cup.jpg")}
          resizeMode={"stretch"}
          style={{ flex: 1 }}
        ></Image>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ paddingBottom: 10 }}>
          <C42TextInputWithIcon
            iconName={"at-circle-sharp"}
            iconSize={22}
            iconColor={"grey"}
            placeholder={"Email"}
            value={authState.email}
            onChangeText={(text: string) => dispatch(changeEmail(text))}
          />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <C42TextInputWithIcon
            iconName={"lock-closed"}
            iconSize={22}
            iconColor={"grey"}
            placeholder={"Password"}
            secureTextEntry={true}
            value={authState.password}
            onChangeText={(text: string) => dispatch(changePassword(text))}
          />
        </View>
        <View style={{ paddingBottom: 30 }}>
          <C42PrimaryButton
            text={polyglot?.t("sign_in")}
            onPress={() => dispatch(doLogin(authState))}
          ></C42PrimaryButton>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <Text style={{ color: "black" }}>
            {polyglot?.t("forgot_password")}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", width: "100%", paddingTop: safeAreaInsets.top, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
