import React from "react";
import styles from "../../styles/lives.module.scss";
import { LivesHeader } from "./LivesHeader";
import { LivesList } from "./LivesList";

export const LivesContainer: React.FC = (): JSX.Element => {
  return (
    <div className={styles.lives}>
      <LivesHeader />
      <LivesList title={"Just for you"} />
      <LivesList title={"Trending on Gaming"} />
      <LivesList title={"IRL"} />
      <LivesList title={"Adult Cams"} />
    </div>
  );
};
