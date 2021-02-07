import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "red",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default function SkillsScreen() {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <C42Text text={polyglot?.t("title_skills")}></C42Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}
