import React from "react";
import { LivesListProps } from "../../constants/types";
import styles from "../../styles/lives.module.scss";
import { LiveThumbnail } from "./LiveThumbnail";

export const LivesList: React.FC<LivesListProps> = ({
  title,
  endpoint,
}): JSX.Element => {
  return (
    <div className={styles.livesList}>
      <h1 className={styles.livesListTitle}>{title}</h1>
      <ul className={styles.livesUl}>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
        <li>
          <LiveThumbnail />
        </li>
      </ul>
    </div>
  );
};
