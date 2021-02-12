import React, {useEffect} from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import C42Text from "../../components/text/text";
import { I18nContext } from "../../config/i18n";
import { ThemeContext } from "../../config/theming";
import { FlatList } from "react-native-gesture-handler";
import {fetchSkillSteps} from "../../redux/modules/skills/skills-reducer";
import { RootState } from "../../redux/root-reducer";
import {SkillModel} from "../../models/skills-response";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: 300
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal : 16,
    paddingTop: 16
  },
});

function getSkillImage(skillImage: string) {
  switch(skillImage) {
    case "javascript.png":
      return require("../../images/skill-images/javascript.png");
  }
}

export default function SkillDetailScreen() {
  const dispatch = useDispatch();
  const polyglot = I18nContext.polyglot;
  const theme = ThemeContext.useTheme();
  const skillsState = useSelector((state: RootState) => state.skills);

    const {selectedSkill} = skillsState;
    const skillImage = selectedSkill ? selectedSkill.image : "";
    const skillId = selectedSkill ? selectedSkill.id: 0;

  useEffect(function() {
    dispatch(fetchSkillSteps(skillId));
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
            <ImageBackground source={getSkillImage(skillImage)} style={{flex: 1, justifyContent: "flex-end"}}>
                <View style={{
                    padding: 10, 
                    borderTopRightRadius: 5, 
                    borderBottomRightRadius: 5,
                    marginBottom: 20, 
                    marginRight: 10, 
                    backgroundColor : "#FFFFFFAA"
                }}>
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
                <View style={{height : 10}}></View>
                <C42Text
                    size={14}
                    fontWeight={"normal"}
                    text={selectedSkill?.longDescription}
                ></C42Text>
            </View>
            <View style={{borderColor : "#EEEEEE", borderWidth : 0.5, marginTop : 16, marginBottom: 16}}></View>
            <View style={{ flex: 1}}>
                <C42Text
                    size={18}
                    fontWeight={"bold"}
                    text={polyglot?.t("title_skill_steps")}
                ></C42Text>
                <View style={{height : 10}}></View>
                <FlatList data={skillsState.allSkills} renderItem={({item} : {item: SkillModel}) => {
            return <View>
                                <C42Text
                    size={14}
                    fontWeight={"normal"}
                    text={selectedSkill?.shortDescription}
                ></C42Text>
            </View>
          }}></FlatList>
            </View>
        </View>
      </View>
    </View>
  );
}
