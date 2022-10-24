import React, { useContext, useEffect } from "react";
import { Hotkey, hotkeysContext, Keys } from "../contexts/hotkeysContext";

export const useHotkeys = (hotkeyName: string, cb: Function, keys: Keys) => {
  const { state, dispatch } = useContext(hotkeysContext);

  useEffect(() => {
    dispatch({ type: "setHotkey", payload: { hotkeyName, cb, keys } });
  }, []);

  useEffect(() => {
    const enableHotkeys = (e: any) => {
      state.hotkeys.forEach((hotkey: Hotkey) => {
        const { hotkeyName, cb, keys } = hotkey;
        if (
          e.code === keys.key &&
          e.metaKey === keys.metaKey &&
          e.ctrlKey === keys.ctrlKey &&
          e.altKey === keys.altKey &&
          e.shiftKey === keys.shiftKey
        ) {
          cb();
        }
      });
    };
    document.addEventListener("keydown", enableHotkeys);
    return () => document.removeEventListener("keydown", enableHotkeys);
  }, [state.hotkeys]);
};
