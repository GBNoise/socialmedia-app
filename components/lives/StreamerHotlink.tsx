import React from "react";
import { Hotlinkprops } from "../../constants/types";
import styles from "../../styles/lives.module.scss";

export const Hotlink: React.FC<Hotlinkprops> = (props): JSX.Element => {
  return (
    <div className={styles.hotlink}>
      <span className={styles.image}></span>
    </div>
  );
};
