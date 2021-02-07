import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { ThemeContext } from "../../config/theming";

const C42Text = (props: any): JSX.Element => {
  const theme = ThemeContext.useTheme(props.theme);

  return <Text style={{ color: theme.text.primary }}>{props.text} </Text>;
};

C42Text.defaultProps = {
  text: "",
};

C42Text.propTypes = {
  text: PropTypes.string,
};

export default C42Text;
