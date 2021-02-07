import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../config/theming";

const styles = StyleSheet.create({
  primary: {
    height: 40,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});

export default function Component(props: any): JSX.Element {
  const theme = ThemeContext.useTheme(props.theme);
  return (
    <Pressable
      style={[styles.primary, { backgroundColor: theme.buttons.primary.color }]}
      onPress={props.onPress}
    >
      <Text style={{ color: theme.buttons.primary.textColor }}>
        {props.text}
      </Text>
    </Pressable>
  );
}
