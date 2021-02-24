import React, { useEffect } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../config/theming";
import { GlobalConstants } from "../../config/global-constants";
import { I18nContext } from "../../config/i18n";
import C42Text from "../../components/text/text";
import { fetchAllSkillNews } from "../../redux/modules/skill-news/skill-news-reducer";
import { RootState } from "../../redux/root-reducer";
import { SkillNewsModel } from "../../models/skill-news-model";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "../../navigation/navigation";
import { Ionicons } from "@expo/vector-icons";

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
          text={polyglot?.t("title_dashboard_news")}
        ></C42Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={skillNewsState.skillNews}
            ListEmptyComponent={() => <View style={{ height: GlobalConstants.dimensions.height / 2, justifyContent: "center", alignItems: "center" }}><View style={{ borderWidth: 0.5, borderColor: "#DDD", borderRadius: 5, padding: 8, justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="ios-information-circle-sharp" size={52} color={theme.buttons.primary.color} />
              <C42Text
                size={14}
                fontWeight={"normal"}
                text={polyglot?.t("title_dashboard_info_label")}
              ></C42Text>
            </View></View>}
            renderItem={({ item }: { item: SkillNewsModel }) => {
              return (<TouchableOpacity onPress={() => {
                navigate("SkillNewsDetailScreen", item.id);
              }} style={{ flexDirection: "row", height: 80 }}>
                <View style={{ justifyContent: "center", alignItems: "center", width: 100, height: 80, marginRight: 5 }}>
                  <Image source={{ uri: item.smallImage }} style={{ width: 100, height: 80, borderRadius: 5 }}/>
                </View>
                <View>
                  <C42Text text={item.title} size={14} padding={{ bottom: 5 }} fontWeight="bold" theme={{ color: "black" }}></C42Text>
                  <C42Text text={item.summary} size={12} theme={{ color: "black" }}></C42Text>
                </View>
              </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  </SafeAreaView>);
}
