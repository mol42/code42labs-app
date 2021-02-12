import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons, MaterialIcons, GLYPHS } from "@expo/vector-icons";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
  },
  input: {
    padding: 5,
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#FFFFFF",
  },
  icon: {
    position: "relative",
    top: 5,
  },
  text: {
    color: "black",
  },
});

const PasswordInputText = (props: any): JSX.Element => {
  const [initialFocus, setInitialFocus] = useState(false);
  const [eyeIcon, setEyeIcon] = useState("visibility-off");
  const [isPassword, setIsPassword] = useState(true);

  const changePwdType = () => {
    setEyeIcon(isPassword ? "visibility" : "visibility-off");
    setIsPassword(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
      />
      <TextInput
        {...props}
        style={styles.input}
        secureTextEntry={isPassword}
        value={initialFocus ? props.value : "Password"}
        onFocus={() => setInitialFocus(true)}
      />
      <MaterialIcons
        style={styles.icon}
        name={eyeIcon}
        size={props.iconSize}
        color={props.iconColor}
        onPress={changePwdType}
      />
    </View>
  );
};

PasswordInputText.defaultProps = {
  iconSize: 25,
  placeholder: "Password",
  iconColor: "#222222",
  iconName: "lock-closed",
};

PasswordInputText.propTypes = {
  iconSize: PropTypes.number,
  value: PropTypes.string,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default PasswordInputText;
