import React from "react";
import styles from "../../styles/lives.module.scss";

export const LivePlayer = () => {
  return (
    <>
      <div className={styles.livePlayer}></div>
      <span className={styles.livePlayerInfo}>
        <h1 className={styles.livePlayerTitle}>LiveStream title</h1>
        <span className={styles.livePlayerMetaData}>
          <p>Streamer Username</p>
          <p>Live timeup</p>
        </span>
        <span className={styles.livePlayerStreamerMetaData}></span>
      </span>
    </>
  );
};
