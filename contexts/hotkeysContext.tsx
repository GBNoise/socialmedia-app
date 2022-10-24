import React, { createContext, useReducer } from "react";
import { ProviderValue } from "../constants/types";
import { useHotkeys } from "../hooks/useHotkeys";

export const hotkeysContext = createContext({} as ProviderValue);

export interface Keys {
  key: string;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
}

export interface Hotkey {
  hotkeyName: string;
  cb: Function;
  keys: Keys;
}

interface HotkeysState {
  hotkeys: Hotkey[];
}

const initialState: HotkeysState = {
  hotkeys: [],
};

const reducer = (state: HotkeysState, action: any) => {
  switch (action.type) {
    case "setHotkey":
      const { hotkeyName, cb, keys } = action.payload;
      const newHotkey: Hotkey = { hotkeyName, cb, keys };
      const unique = state.hotkeys.map(({ hotkeyName }) => hotkeyName);
      if (unique.includes(hotkeyName)) return state;
      return { ...state, hotkeys: [...state.hotkeys, newHotkey] };

    default:
      return state;
  }
};

export const HotkeysProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <hotkeysContext.Provider value={{ state, dispatch }}>
      {children}
    </hotkeysContext.Provider>
  );
};
