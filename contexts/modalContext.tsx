import React, { createContext, useReducer, useEffect } from "react";
import { Modal } from "../components/Modal";
import { ProviderValue } from "../constants/types";

interface ModalContextState {
  title: string;
  message?: string;
  statusCode?: number | string | null;
}

export const modalContext = createContext({} as ProviderValue);

const initialState: ModalContextState = {
  title: "",
  message: "",
  statusCode: null,
};

const reducer = (state: ModalContextState, action: any) => {
  switch (action.type) {
    case "setMessage":
      return {
        ...state,
        title: action.title,
        message: action.message || "",
        statusCode: action.code || null,
      };
    default:
      return { ...state };
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let tOut: NodeJS.Timeout;
    if (state.title) {
      tOut = setTimeout(() => {
        dispatch({ type: "setMessage", title: "" });
      }, 5000);
    }
    return () => tOut && clearTimeout(tOut);
  }, [state.title]);

  return (
    <modalContext.Provider value={{ state, dispatch }}>
      {state.title && <Modal />}
      {children}
    </modalContext.Provider>
  );
};
