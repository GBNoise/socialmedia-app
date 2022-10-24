import React, {
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { settingsContext } from "./settingsContext";
import {
  AccentColor,
  Children,
  ColorProvider,
  Theme,
} from "../../constants/types";

export const colorSchemeContext = createContext({} as ColorProvider);

export const ColorSchemeProvider = ({ children }: Children) => {
  const { state, dispatch } = useContext(settingsContext);

  const { colorScheme } = state;

  const { theme, accentColor } = colorScheme;

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--accentColor", accentColor);
  }, [accentColor]);

  const changeTheme = (theme: Theme) => {
    dispatch({ type: "changeTheme", payload: theme });
  };

  const changeAccentColor = (accentColor: AccentColor) => {
    dispatch({ type: "changeAccentColor", payload: accentColor });
  };

  return (
    <colorSchemeContext.Provider
      value={{ ...state.colorScheme, changeTheme, changeAccentColor }}
    >
      {children}
    </colorSchemeContext.Provider>
  );
};
