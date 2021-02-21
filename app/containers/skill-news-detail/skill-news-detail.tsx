import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootState } from "../../redux/root-reducer";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { goBack } from "../../navigation/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: 150,
  },
  bottomContainer: {
    flex: 1
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  }
});

function getSkillImage(skillImage: string) {
  switch (skillImage) {
  case "javascript.png":
    return require("../../images/skill-images/javascript.png");
  }
}

function generateHtml(bodyContent: string | undefined) {
  return `<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  </head>
  <body>
  ${bodyContent}
  </body>
  </html>
  `;
}

export default function SkillNewsDetailScreen(props: any): JSX.Element {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillNewsState = useSelector((state: RootState) => state.skillNews);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
      edges={["top"]}
    >
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
          <WebView style={{ flex: 1 }} source={{ html: generateHtml(skillNewsState.skillNews[0].content) }} />
        </View>
      </View>
      <View style={{ position: "absolute", width: "100%", paddingTop: safeAreaInsets.top, paddingLeft: 16 }}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
