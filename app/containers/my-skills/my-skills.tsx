import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { GlobalConstants } from "../../config/global-constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  fetchAllFavoriteSkills,
  setSelectedSkill
} from "../../redux/modules/skills/skills-reducer";
import { RootState } from "../../redux/root-reducer";
import { SkillModel } from "../../models/skills-model";
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
});

function getSkillImage(skillImage: string) {
  if (skillImage === "javascript.png") {
    return require("../../images/skill-images/javascript.png");
  }
  return null;
}

export default function MySkillsScreen() {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillsState = useSelector((state: RootState) => state.skills);

  useEffect(function() {
    dispatch(fetchAllFavoriteSkills(null));
  }, []);

  return (
    <SafeAreaView
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
            text={polyglot?.t("title_my_skills")}
          ></C42Text>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={skillsState.favoriteSkills}
            ListEmptyComponent={() => <View style={{ height: GlobalConstants.dimensions.height / 2, justifyContent: "center", alignItems: "center" }}><View style={{ borderWidth: 0.5, borderColor: "#DDD", borderRadius: 5, padding: 8, justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="ios-information-circle-sharp" size={52} color={theme.buttons.primary.color} />
              <C42Text
                size={14}
                fontWeight={"normal"}
                text={polyglot?.t("title_my_skills_info_label")}
              ></C42Text>
            </View></View>}
            renderItem={({ item }: { item: SkillModel }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSelectedSkill(item));
                    navigate("SkillDetailScreen", null);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingBottom: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#EEE",
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 16,
                        borderRadius: 10,
                        backgroundColor: "grey",
                      }}
                    >
                      <Image
                        style={{
                          flex: 1,
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                        }}
                        resizeMode={"stretch"}
                        source={getSkillImage(item.image)}
                      />
                    </View>
                    <View>
                      <C42Text
                        size={15}
                        fontWeight={"bold"}
                        text={item.name}
                        padding={{ bottom: 5 }}
                      ></C42Text>
                      <C42Text
                        size={12}
                        fontWeight={"normal"}
                        text={polyglot?.t("title_programming_language")}
                      ></C42Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
}
