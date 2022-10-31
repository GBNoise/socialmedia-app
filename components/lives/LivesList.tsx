import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import { LivesListProps } from "../../constants/types";
import styles from "../../styles/lives.module.scss";
import { LiveThumbnail } from "./LiveThumbnail";

export const LivesList: React.FC<LivesListProps> = ({
  title,
  endpoint,
}): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);
  const livesMockup = new Array(20).fill(0);

  const handleScroll = (action?: "left" | "right") => {
    if (!listRef.current) return;
    let scrollValue = listRef.current.scrollLeft;

    if (action === "left") scrollValue -= 900;
    if (action === "right") scrollValue += 900;

    listRef.current.scroll({
      left: scrollValue,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.livesList}>
      <h1 className={styles.livesListTitle}>{title}</h1>
      <button
        className={styles.listController}
        onClick={() => handleScroll("right")}
      >
        <ArrowRightIcon />
      </button>
      <button
        className={styles.listController}
        onClick={() => handleScroll("left")}
      >
        <ArrowLeftIcon />
      </button>
      <ul className={styles.livesUl} ref={listRef}>
        {livesMockup.map((live, index) => {
          return (
            <li key={index}>
              <LiveThumbnail id={index} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
