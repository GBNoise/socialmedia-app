import React, {
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { settingsContext } from "./settingsContext";
import {
  AccentColor,
  Children,
  ColorProvider,
  Theme,
} from "../../constants/types";
import { getFromLocalStorage } from "../../constants";

export const colorSchemeContext = createContext({} as ColorProvider);

export const ColorSchemeProvider = ({ children }: Children) => {
  const { state, dispatch } = useContext(settingsContext);

  const { colorScheme } = state;

  const { theme, accentColor } = colorScheme;

  const changeTheme = useCallback(
    (theme: Theme) => {
      dispatch({ type: "changeTheme", payload: theme });
    },
    [dispatch]
  );

  const changeAccentColor = useCallback(
    (accentColor: AccentColor) => {
      dispatch({ type: "changeAccentColor", payload: accentColor });
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    let savedTheme = getFromLocalStorage("theme");
    if (savedTheme) changeTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, changeTheme]);

  useLayoutEffect(() => {
    let savedAccent = getFromLocalStorage("accentColor");
    if (savedAccent) changeAccentColor(savedAccent);
    document.documentElement.style.setProperty("--accentColor", accentColor);
  }, [accentColor, changeAccentColor]);

  return (
    <colorSchemeContext.Provider
      value={{ ...state.colorScheme, changeTheme, changeAccentColor }}
    >
      {children}
    </colorSchemeContext.Provider>
  );
};
