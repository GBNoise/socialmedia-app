import React, { useContext } from "react";
import { chatContext } from "../../contexts/chatContext";
import styles from "../../styles/chats.module.scss";
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

export const ChatHeader = () => {
  const { state, dispatch } = useContext(chatContext);
  const { selectedChat } = state;
  const { name, isActive, lastOnline, image } = selectedChat;

  return (
    <div className={styles.chatHeader}>
      <span className={styles.chatHeaderImg}></span>
      <span className={styles.chatMeta}>
        <p className={styles.chatName}>{name}</p>
        <p className={styles.chatStatus}>{isActive ? "online" : lastOnline}</p>
      </span>

      <div className={`${styles.chatHeaderIcons} ${styles.iconsContainer}`}>
        <PhoneIcon width={30} />
        <VideoCameraIcon width={30} />
      </div>
    </div>
  );
};
