import styles from "../../styles/chats.module.scss";
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { chatContext, Messages } from "../../contexts/chatContext";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const { state, dispatch } = useContext(chatContext);
  const { selectedChat } = state;

  const handleInputChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    // just for testing we will create a message mockup
    const message: Messages = {
      content: text,
      isDeleted: false,
      isRead: false,
      receivedAt: new Date(),
      receiver: "tania",
      sender: "noisex",
      sentAt: new Date(),
    };

    dispatch({ type: "setMessages", payload: message });
    setText("");
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="type a message"
        value={text}
        onChange={handleInputChange}
      />
      <div className={styles.iconsContainer}>
        <RectangleGroupIcon />
        <RectangleStackIcon />
        <MicrophoneIcon />
        <button type="submit">
          <PaperAirplaneIcon />
        </button>
      </div>
    </form>
  );
};
