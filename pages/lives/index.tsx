import React from "react";
import { LivesContainer } from "../../components/lives/LivesContainer";
import Page from "../../components/Page";
import styles from "../../styles/lives.module.scss";
const Lives = () => {
  return (
    <Page
      title="Lives"
      description="Live broadcasts"
      className={styles.livesContainer}
    >
      <LivesContainer />
    </Page>
  );
};

export default Lives;
