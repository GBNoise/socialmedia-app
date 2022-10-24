import styles from "../../styles/chats.module.scss";
import React, { useContext } from "react";
import { chatContext } from "../../contexts/chatContext";
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const Chat = () => {
  const { state } = useContext(chatContext);

  if (!state.selectedChat)
    return (
      <div className={styles.chat}>
        <h3>Select a conversation or start a new one</h3>
      </div>
    );

  return (
    <div className={styles.chat} data-attr="active">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};
