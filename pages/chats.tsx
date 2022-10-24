import React from "react";
import Page from "../components/Page";
import styles from "../styles/chats.module.scss";
import { ChatProvider } from "../contexts/chatContext";
import { ChatsContainer } from "../components/chats/ChatsContainer";

const ChatsPage = () => {
  return (
    <ChatProvider>
      <Page
        title={"Chats"}
        description={"Chat with your friends"}
        className={styles.chatsContainer}
      >
        <ChatsContainer />
      </Page>
    </ChatProvider>
  );
};

export default ChatsPage;
