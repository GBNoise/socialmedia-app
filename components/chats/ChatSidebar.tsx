import { chatContext, UserChatInfo } from "../../contexts/chatContext";
import styles from "../../styles/chats.module.scss";
import React, { useContext } from "react";
import { ChatSidebarHeader } from "./ChatSidebarHeader";

const chats: UserChatInfo[] = [
  {
    lastOnline: "someday",
    isActive: true,
    name: "tania",
    image: true,
    messages: [
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content:
          "this is a random message and I do not even know what to do with that big fat butt",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },

      {
        sender: "noisex",
        receiver: "tania",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "tania",
        receiver: "noisex",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
      {
        sender: "noisex",
        receiver: "tania",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: true,
        isDeleted: false,
        content: "this is a random message",
      },
    ],
  },
];

export const ChatSidebar = () => {
  const { state, dispatch } = useContext(chatContext);

  const handleChatChange = (chat: UserChatInfo) => {
    dispatch({ type: "setSelectedChat", payload: chat });
  };

  return (
    <div className={styles.chatsSidebar}>
      <ChatSidebarHeader />
      <ul className={styles.chatsList}>
        {chats.map((chat, index) => {
          const { lastOnline, name, isActive, image } = chat;
          return (
            <li key={index} onClick={() => handleChatChange(chat)}>
              <div className={styles.chatImage}></div>
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
