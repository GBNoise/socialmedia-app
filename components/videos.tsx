import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { formatK } from "../constants";
import styles from "../styles/videos.module.scss";

declare type Video = {
  id: string;
  url: string;
  uploadedAt: Date;
  owner?: {
    id: string;
    username: string;
  };
  likedBy: {
    id: string;
    username: string;
  }[];
  savedBy?: {
    id: string;
    username: string;
  }[];
  dislikedBy?: {
    id: string;
    username: string;
  }[];
};

const dataMockup: Video[] = [
  {
    id: "12341234",
    url: "image4.jpg",
    uploadedAt: new Date(),
    likedBy: new Array(Math.floor(Math.random() * 1234123)).fill(0),
  },
  {
    id: "123341234",
    url: "image4.jpg",
    uploadedAt: new Date(),
    likedBy: new Array(Math.floor(Math.random() * 1234123)).fill(0),
  },
  {
    id: "12342341234",
    url: "image4.jpg",
    uploadedAt: new Date(),
    likedBy: new Array(Math.floor(Math.random() * 1234123)).fill(0),
  },
  {
    id: "123412341234",
    url: "image4.jpg",
    uploadedAt: new Date(),
    likedBy: new Array(Math.floor(Math.random() * 1234123)).fill(0),
  },
];

export const VideosContainer: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(dataMockup[0]);

  return (
    <>
      <Videos setCurrentVideo={setCurrentVideo} data={dataMockup} />
      <Interactions currentVideo={currentVideo} />
    </>
  );
};

const Videos: React.FC<{
  setCurrentVideo: React.Dispatch<React.SetStateAction<Video>>;
  data: Video[];
}> = ({ setCurrentVideo, data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollOffset = 870;

  const onScroll = () => {
    let scroll = containerRef.current?.scrollTop;
    if (!scroll) return;
    let currentVideoIndex = Math.round((scroll - 47) / scrollOffset);
    setCurrentVideo(data[currentVideoIndex]);
  };

  const effectHandler = () => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener("scroll", onScroll);

    return () => {
      if (!containerRef.current) return;
      containerRef.current.removeEventListener("scroll", onScroll);
    };
  };

  useEffect(effectHandler, [containerRef]);
  return (
    <div className={styles.videosContainer} ref={containerRef}>
      {data.map((video) => {
        return <img src={video.url} className={styles.video}></img>;
      })}
    </div>
  );
};

const Interactions: React.FC<{ currentVideo: Video }> = ({ currentVideo }) => {
  return (
    <div className={styles.interactions}>
      <span>
        <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />
        <p>{formatK(12341)}</p>
      </span>

      <span>
        <FontAwesomeIcon icon={faThumbsDown} className={styles.icon} />
        <p>{formatK(102000)}</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faComment} className={styles.icon} />
        <p>{formatK(1200800)}</p>
      </span>
    </div>
  );
};
