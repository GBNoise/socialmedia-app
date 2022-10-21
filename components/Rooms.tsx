import React from "react";
import styles from "../styles/rooms.module.scss";
import Page from "./Page";
import moment from "moment";

export const RoomsContainer = () => {
  const arr = new Array(30).fill(
    <Room
      name="Wild Project"
      members={[]}
      createdAt={new Date("2022-09-27T09:00:00")}
    />
  );

  return (
    <Page
      title="room"
      description="voice chats"
      className={styles.roomsContainer}
    >
      {arr.map((el) => el)}
    </Page>
  );
};

interface RoomProps {
  name: string;
  members: any[];
  createdAt: Date;
}

const Room: React.FC<RoomProps> = ({ name, members, createdAt }) => {
  return (
    <div className={styles.room}>
      <span className={styles.img}></span>
      <span className={styles.information}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.members}></span>
        <p className={styles.timeactive}>
          Time Active: {moment(createdAt).fromNow().replace("ago", "")}
        </p>
      </span>
    </div>
  );
};
