import React from "react";
import Page from "./Page";
import styles from "../styles/loading.module.scss";

export const Loading = () => {
  return (
    <Page title="Loading..." description="" className={styles.loadingContainer}>
      <Spinner />
    </Page>
  );
};

export const Spinner = () => {
  return (
    <>
      <div className={styles.spinner}></div>
      <span className={styles.text}>
        <h2>Loading</h2>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </span>
    </>
  );
};
