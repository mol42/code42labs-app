import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../config/theming";
import { I18nContext } from "../../config/i18n";
import C42Text from "../../components/text/text";
import { fetchAllSkillNews } from "../../redux/modules/skill-news/skill-news-reducer";
import { RootState } from "../../redux/root-reducer";
import { SkillNewsModel } from "../../models/skill-news-model";

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
  const skillNewsState = useSelector((state: RootState) => state.skillNews);


  useEffect(function() {
    dispatch(fetchAllSkillNews(null));
  }, []);

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
          text={polyglot?.t("title_dashboard")}
        ></C42Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={skillNewsState.skillNews}
            renderItem={({ item }: { item: SkillNewsModel }) => {
              return (<View>
                <C42Text text={item.title} size={14} theme={{ color: "black" }}></C42Text>
              </View>
              );
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  </SafeAreaView>);
}
