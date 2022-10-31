import React from "react";
import styles from "../../styles/lives.module.scss";
import Link from "next/link";

export const LiveThumbnail = ({ id }: { id: string | number }) => {
  return (
    <Link href={`/lives/${id}`}>
      <div className={styles.liveThumbnail}>
        <div className={styles.thumbnail}></div>
        <span className={styles.liveInfo}>
          <p>Ninja - Fortnite Duos w/ Myth</p>
          <p>
            <Link href="/">Fortnite</Link>
          </p>
          <p>
            <Link href="/">Ninja</Link>
          </p>
        </span>
      </div>
    </Link>
  );
};
