import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../config/theming";
import { I18nContext } from "../../config/i18n";
import C42Text from "../../components/text/text";
import { updateProfileTheme } from "../../redux/modules/global/global-reducer";
import { RootState } from "../../redux/root-reducer";
import { doLogout } from "../../redux/modules/auth/auth-reducer";
import C42PrimaryButton from "../../components/button/primary";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    paddingBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  settingLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default function SkillsScreen(): JSX.Element {
  const dispatch = useDispatch();
  const theme = ThemeContext.useTheme();
  const polyglot = I18nContext.polyglot;
  const globalState = useSelector((state: RootState) => state.global);
  const toggleSwitch = () => {
    const toggledTheme = globalState.theme === "dark" ? "normal" : "dark";
    dispatch(updateProfileTheme(toggledTheme));
  };

  return (<SafeAreaView
    style={[
      styles.safeArea,
      { backgroundColor: theme.colors.backgroundColor },
    ]}
    edges={["top"]}
  >
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <C42Text
          size={36}
          fontWeight={"bold"}
          text={polyglot?.t("title_settings")}
        ></C42Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.settingLine}>
              <C42Text size={16} text={polyglot?.t("title_settings_dark_theme")}></C42Text>
              <Switch
                onValueChange={toggleSwitch}
                value={globalState.theme === "dark"}
              />
            </View>
          </View>
          <View style={{ height: 80, justifyContent: "center" }}>
            <C42PrimaryButton text={"Logout"} onPress={() => dispatch(doLogout(null))}></C42PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>);
}
