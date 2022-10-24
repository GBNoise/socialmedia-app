import React, { createContext, useContext, useReducer } from "react";
import { authContext } from "./authContext";
import { ProviderValue } from "../constants/types";

export interface Messages {
  id?: string;
  sender: string;
  receiver: string;
  sentAt: Date | null;
  receivedAt: Date | null;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

export interface UserChatInfo {
  lastOnline: string;
  isActive: boolean;
  name: string;
  image: any;
  messages: Messages[];
}

interface ChatState {
  chats: UserChatInfo[] | null;
  selectedChat: any;
}

const initialState: ChatState = {
  chats: null,
  selectedChat: null,
};

export const chatContext = createContext({} as ProviderValue);

const reducer = (state: ChatState, action: any) => {
  switch (action.type) {
    // need to make cases to setSelectedChat, setChats, etc...

    case "setSelectedChat":
      return { ...state, selectedChat: action.payload };

    case "setMessages":
      if (!state.selectedChat) return state;

      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          messages: [...state.selectedChat.messages, action.payload],
        },
      };

    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { session, status } = useContext(authContext);

  // need to fetch chats from the session user
  // if the user is not authenticated push to log in route

  return (
    <chatContext.Provider value={{ state, dispatch }}>
      {children}
    </chatContext.Provider>
  );
};
