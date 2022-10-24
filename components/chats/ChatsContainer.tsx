import styles from "../../styles/chats.module.scss";
import React from "react";
import { ChatSidebar } from "./ChatSidebar";
import { Chat } from "./Chat";

export const ChatsContainer = () => {
  return (
    <div className={styles.chats}>
      <ChatSidebar />
      <Chat />
    </div>
  );
};
