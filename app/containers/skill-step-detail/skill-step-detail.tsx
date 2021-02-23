import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, ImageBackground, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchSkillStepResources, updateSkillStepProgress } from "../../redux/modules/skills/skills-reducer";
import { RootState } from "../../redux/root-reducer";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { SkillStepResourceModel } from "../../models/skill-step-resource-model";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";
import { WebView } from "react-native-webview";
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

const initialLayout = { width: Dimensions.get("window").width };
const TYPE_VIDEO_RESOURCES = 1;
const TYPE_LINK_RESOURCES = 2;
const TAB_LINK_STYLE = { text: {
  colors: {
    primary: "black"
  }
} };

export default function SkillStepDetailScreen(): JSX.Element {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillsState = useSelector((state: RootState) => state.skills);
  const safeAreaInsets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: "first", title: polyglot?.t("title_description") },
    { key: "second", title: polyglot?.t("title_additional_resources") },
  ]);

  const { selectedSkill, selectedSkillStep, selectedSkillStepResources, skillStepProgress } = skillsState;
  const skillImage = selectedSkill ? selectedSkill.image : "";
  const skillId = selectedSkill ? selectedSkill.id : 0;
  const skillStepId = selectedSkillStep ? selectedSkillStep.id : 0;
  const isCompleted = skillStepProgress ? skillStepProgress.progress[`skill_${skillId}`][skillStepId] : false;

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
      <View style={styles.mainContainer}>
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
          <TabView
            style={{ padding: 0, margin: 0, borderWidth: 0.5, borderColor: "#DDD" }}
            navigationState={{ index, routes }}
            renderTabBar={props => <View style={{ flexDirection: "row", backgroundColor: "#eeeeee", marginHorizontal: 2, marginTop: 4, padding: 4, borderRadius: 8 }}>
              <View style={[styles.tabContainer, { borderRadius: 8, backgroundColor: props.navigationState.index === 0 ? "#cccccc" : "transparent" }]}>
                <TouchableOpacity onPress={() => {
                  props.jumpTo("first");
                }}>
                  <C42Text size={14} text={polyglot?.t("title_description")} theme={TAB_LINK_STYLE}></C42Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.tabContainer, { borderRadius: 8, backgroundColor: props.navigationState.index === 1 ? "#cccccc" : "transparent" }]}>
                <TouchableOpacity onPress={() => {
                  props.jumpTo("second");
                }}>
                  <C42Text size={14} text={polyglot?.t("title_additional_resources")} theme={TAB_LINK_STYLE}></C42Text>
                </TouchableOpacity>
              </View>
            </View>}
            renderScene={SceneMap({
              first: () => {
                return <View style={{ flex: 1 }}>
                  <WebView style={{ flex: 1 }} source={{ html: generateHtml(selectedSkillStep?.longDescription) }} />
                </View>;
              },
              second: () => {
                return (<><View style={{ paddingHorizontal: 8, paddingTop: 8 }}>
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
                <View style={{ paddingHorizontal: 8 }}>
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
                </View></>);
              },
            })}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", width: "100%", paddingTop: safeAreaInsets.top, height: 40 + safeAreaInsets.top, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(updateSkillStepProgress({ skillId, skillStepId, isCompleted: !isCompleted }));
        }}>
          <Ionicons name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
