import React from "react";
import Page from "./Page";
import styles from "../styles/loading.module.scss";

export const Loading = () => {
  return (
    <Page title="Loading..." description="" className={styles.loadingContainer}>
      <div></div>
      <span>
        <h2>Loading</h2>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </span>
    </Page>
  );
};
