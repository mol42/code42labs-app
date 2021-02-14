import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fetchSkillStepResources } from "../../redux/modules/skills/skills-reducer";
import { RootState } from "../../redux/root-reducer";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SkillStepResourceModel } from "../../models/skill-step-resource-model";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { goBack } from "../../navigation/navigation";

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

const TYPE_VIDEO_RESOURCES = 1;
const TYPE_LINK_RESOURCES = 2;

export default function SkillStepDetailScreen(): JSX.Element {
  // const [webViewUrl, setWebViewUrl] = useState("");
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillsState = useSelector((state: RootState) => state.skills);
  const safeAreaInsets = useSafeAreaInsets();
  // const modalizeRef = useRef(null);

  const { selectedSkill, selectedSkillStep, selectedSkillStepResources } = skillsState;
  const skillImage = selectedSkill ? selectedSkill.image : "";
  const skillId = selectedSkill ? selectedSkill.id : 0;
  const skillStepId = selectedSkillStep ? selectedSkillStep.id : 0;

  useEffect(() => {
    dispatch(fetchSkillStepResources({ skillId, skillStepId }));
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
                text={selectedSkillStep?.name}
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
              text={selectedSkillStep?.longDescription}
            ></C42Text>
          </View>
          <View
            style={{
              borderColor: "#EEEEEE",
              borderWidth: 0.5,
              marginTop: 16,
              marginBottom: 16,
            }}
          ></View>
          <View style={{ flex: 1 }}>
            <C42Text
              size={18}
              fontWeight={"bold"}
              text={polyglot?.t("title_skill_step_video_resources")}
            ></C42Text>
            <View style={{ height: 10 }}></View>
            {selectedSkillStepResources.filter(item => item.type === TYPE_VIDEO_RESOURCES).map((item: SkillStepResourceModel) => {
              return (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(item.data["link"]);
                }}>
                  <View
                    key={`key-${item.id}`}
                    style={{
                      paddingVertical: 10,
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <C42Text
                      size={16}
                      fontWeight={"normal"}
                      text={item.data["link"]}
                    ></C42Text>
                    <Entypo
                      name="chevron-with-circle-right"
                      size={24}
                      color={theme.buttons.primary.color}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ flex: 1 }}>
            <C42Text
              size={18}
              fontWeight={"bold"}
              text={polyglot?.t("title_skill_step_text_resources")}
            ></C42Text>
            <View style={{ height: 10 }}></View>
            {selectedSkillStepResources.filter(item => item.type === TYPE_LINK_RESOURCES).map((item: SkillStepResourceModel) => {
              return (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(item.data["link"]);
                }}>
                  <View
                    key={`key-${item.id}`}
                    style={{
                      paddingVertical: 10,
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <C42Text
                      size={16}
                      fontWeight={"normal"}
                      text={item.data["link"]}
                    ></C42Text>
                    <Entypo
                      name="chevron-with-circle-right"
                      size={24}
                      color={theme.buttons.primary.color}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", width: "100%", paddingTop: safeAreaInsets.top, paddingLeft: 16 }}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
