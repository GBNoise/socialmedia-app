import Image from "next/image";
import React from "react";
import Page from "../components/Page";
import { VideosContainer } from "../components/videos";
import styles from "../styles/videos.module.scss";

const Videos = () => {
  return (
    <Page title={""} description={""} className={styles.videos}>
      <VideosContainer />
    </Page>
  );
};

export default Videos;
