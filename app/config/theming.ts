import { createTheming } from "@callstack/react-theme-provider";

export const darkTheme = {
  colors: {
    primary: "#FF0000",
    secondary: "",
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    primary: {
      color: "#FF0000",
      textColor: "white",
    },
    common: {
      color: "white",
      textColor: "black",
    },
  },
  text: {
    colors: {
      primary: "black",
    },
    sizes: {
      h1: 24,
    },
  },
};

export const whiteTheme = {
  colors: {
    primary: "#1E59F5",
    secondary: "",
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    primary: {
      color: "#1E59F5",
      textColor: "white",
    },
    common: {
      color: "white",
      textColor: "black",
    },
  },
  text: {
    colors: {
      primary: "black",
    },
    sizes: {
      h1: 24,
    },
  },
};

type ThemeContextType = {
  ThemeProvider: any;
  withTheme: any;
  useTheme: any;
};

export const ThemeContext: ThemeContextType = {
  ThemeProvider: null,
  withTheme: null,
  useTheme: null,
};

export function initTheme(theme: any): void {
  const { ThemeProvider, withTheme, useTheme } = createTheming(theme);
  ThemeContext.ThemeProvider = ThemeProvider;
  ThemeContext.withTheme = withTheme;
  ThemeContext.useTheme = useTheme;
}
