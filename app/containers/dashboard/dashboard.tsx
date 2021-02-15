import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../config/theming";
import { I18nContext } from "../../config/i18n";
import C42Text from "../../components/text/text";

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

export default function DashboardScreen(): JSX.Element {
  const dispatch = useDispatch();
  const theme = ThemeContext.useTheme();
  const polyglot = I18nContext.polyglot;

  return (<SafeAreaView
    style={[
      styles.safeArea,
      { backgroundColor: theme.colors.backgroundColor },
    ]}
    edges={["top"]}
  >
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>

        </View>
      </View>
    </View>
  </SafeAreaView>);
}
