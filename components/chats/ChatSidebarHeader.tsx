import styles from "../../styles/chats.module.scss";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

export const ChatSidebarHeader = () => {
  return (
    <div className={styles.sidebarHeader}>
      <MagnifyingGlassIcon className={styles.searchIcon} />
      <input type="text" placeholder="Search or start a new chat" />
    </div>
  );
};
