import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fetchSkillSteps, setSelectedSkillStep, updateSkillFavorites, fetchAllFavoriteSkills, fetchSkillStepProgress } from "../../redux/modules/skills/skills-reducer";
import { RootState } from "../../redux/root-reducer";
import { SkillStepModel } from "../../models/skill-step-model";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { navigate, goBack } from "../../navigation/navigation";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: 300,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

function getSkillImage(skillImage: string) {
  switch (skillImage) {
  case "javascript.png":
    return require("../../images/skill-images/javascript.png");
  }
}

export default function SkillDetailScreen(): JSX.Element {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillsState = useSelector((state: RootState) => state.skills);
  const safeAreaInsets = useSafeAreaInsets();

  const { selectedSkill, favoriteSkills, skillStepProgress } = skillsState;
  const skillImage = selectedSkill ? selectedSkill.image : "";
  const skillId = selectedSkill ? selectedSkill.id : 0;
  const isFavorite = favoriteSkills.findIndex(item => item.id === skillId) > -1;

  useEffect(() => {
    dispatch(fetchSkillSteps(skillId));
    dispatch(fetchAllFavoriteSkills(skillId));
    dispatch(fetchSkillStepProgress(skillId));
  }, []);

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <ScrollView style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <ImageBackground
            source={getSkillImage(skillImage)}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <View
              style={{
                padding: 10,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                marginBottom: 20,
                marginRight: 10,
                backgroundColor: "#FFFFFFAA",
              }}
            >
              <C42Text
                size={24}
                fontWeight={"normal"}
                text={selectedSkill?.name}
              ></C42Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <C42Text
              size={18}
              fontWeight={"bold"}
              text={polyglot?.t("title_description")}
            ></C42Text>
            <View style={{ height: 10 }}></View>
            <C42Text
              size={14}
              fontWeight={"normal"}
              text={selectedSkill?.longDescription}
            ></C42Text>
          </View>
          <View
            style={{
              // borderColor: "#DDD",
              // borderWidth: 0.5,
              marginTop: 16,
              marginBottom: 16,
            }}
          ></View>
          <View style={{ flex: 1 }}>
            <C42Text
              size={18}
              fontWeight={"bold"}
              text={polyglot?.t("title_skill_steps")}
            ></C42Text>
            <View style={{ height: 10 }}></View>
            {skillsState.selectedSkillSteps.map((item: SkillStepModel) => {
              const isCompleted = skillStepProgress ? skillStepProgress.progress[`skill_${skillId}`][item.id] : false;

              return (
                <TouchableOpacity onPress={() => {
                  dispatch(setSelectedSkillStep(item));
                  navigate("SkillStepDetailScreen", null);
                }}>
                  <View
                    key={`key-${item.id}`}
                    style={{
                      borderBottomWidth: 0.5,
                      borderColor: "#DDD",
                      padding: 10,
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <C42Text
                      size={16}
                      fontWeight={"normal"}
                      text={item.name}
                    ></C42Text>
                    <View style={{ flexDirection: "row" }}>
                      {
                        isCompleted && <Ionicons name={"checkmark-circle"} size={24} color="green" />
                      }
                      <Entypo
                        name="chevron-with-circle-right"
                        size={28}
                        color={theme.buttons.primary.color}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", width: "100%", paddingTop: safeAreaInsets.top, height: 40 + safeAreaInsets.top, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(updateSkillFavorites({ skillId, isFavorite: !isFavorite }));
        }}>
          <Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
