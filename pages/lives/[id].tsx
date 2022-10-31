import React from "react";
import { SingleLiveContainer } from "../../components/lives";
import Page from "../../components/Page";
import styles from "../../styles/lives.module.scss";

const Live = () => {
  return (
    <Page title={""} description={""} className={styles.singleLive}>
      <SingleLiveContainer />
    </Page>
  );
};

export default Live;
