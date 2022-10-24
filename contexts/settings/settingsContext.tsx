import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import {
  CustomSettingsProviderValue,
  SettingsState,
} from "../../constants/types";
import { SettingsContainer } from "../../components/settings";
import { useHotkeys } from "../../hooks/useHotkeys";
import { ColorSchemeProvider } from "./colorSchemeContext";
import { getFromLocalStorage, saveToLocalStorage } from "../../constants";

export const settingsContext = createContext({} as CustomSettingsProviderValue);

const initialValue: SettingsState = {
  isActive: false,
  selectedSetting: "",
  colorScheme: {
    theme: "#000",
    accentColor: "rgba(254, 44, 85, 1)",
  },
};

const reducer = (state: SettingsState, action: any) => {
  switch (action.type) {
    case "toggleIsActive":
      return { ...state, isActive: !state.isActive };

    case "setSelectedSetting":
      return { ...state, selectedSetting: action.payload };

    case "goBack":
      return { ...state, selectedSetting: "" };

    case "changeTheme":
      saveToLocalStorage("theme", action.payload);
      return {
        ...state,
        colorScheme: { ...state.colorScheme, theme: action.payload },
      };

    case "changeAccentColor":
      saveToLocalStorage("accentColor", action.payload);

      return {
        ...state,
        colorScheme: { ...state.colorScheme, accentColor: action.payload },
      };

    default:
      return state;
  }
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  useHotkeys("open settings", () => dispatch({ type: "toggleIsActive" }), {
    altKey: false,
    ctrlKey: false,
    key: "KeyP",
    metaKey: true,
    shiftKey: true,
  });

  const goBack = () => {
    dispatch({ type: "goBack" });
  };

  return (
    <settingsContext.Provider value={{ state, dispatch, goBack }}>
      <ColorSchemeProvider>
        {children}
        {state.isActive && <SettingsContainer />}
      </ColorSchemeProvider>
    </settingsContext.Provider>
  );
};
