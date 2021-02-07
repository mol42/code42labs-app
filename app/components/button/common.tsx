import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../config/theming";

const styles = StyleSheet.create({
  primary: {
    height: 40,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Component(props: any): JSX.Element {
  const theme = ThemeContext.useTheme(props.theme);
  return (
    <Pressable
      style={[styles.primary, { backgroundColor: theme.buttons.common.color }]}
      onPress={props.onPress}
    >
      <Text style={{ color: theme.buttons.common.textColor }}>
        {props.text}
      </Text>
    </Pressable>
  );
}
