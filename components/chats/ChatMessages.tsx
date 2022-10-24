import React, { useContext, useRef, useLayoutEffect, useEffect } from "react";
import { chatContext, Messages } from "../../contexts/chatContext";
import styles from "../../styles/chats.module.scss";
import { authContext } from "../../contexts/authContext";

export const ChatMessages = () => {
  const { state, dispatch } = useContext(chatContext);
  const { selectedChat } = state;
  const { messages } = selectedChat;
  const { session } = useContext(authContext);
  const { user } = session;

  const ulRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!ulRef.current) return;
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  }, [ulRef, messages]);

  return (
    <ul className={styles.chatMessages} ref={ulRef}>
      {messages.map(
        (
          {
            sender,
            receiver,
            sentAt,
            receivedAt,
            isRead,
            isDeleted,
            content,
          }: Messages,
          index: number
        ) => {
          return (
            <li
              key={index}
              className={styles.chatMessage}
              data-attr={sender === user.username ? "sender" : "receiver"}
            >
              <p className={styles.sender}>{sender}</p>
              <p className={styles.content}>{content}</p>
              <p className={styles.sentAt}>{sentAt?.toLocaleTimeString()}</p>
            </li>
          );
        }
      )}
    </ul>
  );
};
