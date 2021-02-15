import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { ThemeContext } from "../../config/theming";

const C42Text = (props: any): JSX.Element => {
  const theme = ThemeContext.useTheme(props.theme);
  const { fontWeight, size, padding } = props;

  return (
    <Text
      style={{
        color: theme.text.colors.primary,
        fontWeight,
        fontSize: size,
        paddingBottom: padding.bottom
      }}
    >
      {props.text}
    </Text>
  );
};

C42Text.defaultProps = {
  size: 14,
  text: "",
  fontWeight: "normal",
  padding: {},
  theme: null
};

C42Text.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
  fontWeight: PropTypes.string,
  padding: PropTypes.object,
  theme: PropTypes.object
};

export default C42Text;
