import { createTheming } from "@callstack/react-theme-provider";

const darkTheme = {
  colors: {
    primary: "",
    secondary: "",
    backgroundColor: "",
  },
  buttons: {
    primary: {
      color: "blue",
    },
  },
};

const whiteTheme = {
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

export function initTheme(baseTheme: string): void {
  const { ThemeProvider, withTheme, useTheme } = createTheming(whiteTheme);
  ThemeContext.ThemeProvider = ThemeProvider;
  ThemeContext.withTheme = withTheme;
  ThemeContext.useTheme = useTheme;
}
