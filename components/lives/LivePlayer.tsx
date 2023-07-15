import {
  PlayIcon,
  SpeakerWaveIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import styles from "../../styles/lives.module.scss";
import { Hotlink } from "./StreamerHotlink";

export const LivePlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayerControllers = (action: "play" | "expand") => {
    if (!videoRef.current) return;
    switch (action) {
      case "play":
        if (videoRef.current.paused) videoRef.current.play();
        else videoRef.current.pause();
        break;

      case "expand":
        videoRef.current.requestFullscreen();
        break;
    }
  };

  return (
    <>
      <div className={styles.livePlayer}>
        <video
          ref={videoRef}
          autoPlay
          src="https://09-ukr-sv.ennovelas.com/wlooptt2opz54amjhxxyilg7pqqipaowjhxfqjktqw2pc2gppi4o6bzkgt2a/v.mp4"
        />
        <span className={styles.livePlayerController}>
          <button onClick={() => handlePlayerControllers("play")}>
            <PlayIcon />
          </button>
          <button onClick={() => handlePlayerControllers("play")}>
            <SpeakerWaveIcon />
          </button>
          <button onClick={() => handlePlayerControllers("expand")}>
            <ArrowsPointingOutIcon />
          </button>
        </span>
      </div>
      <span className={styles.livePlayerInfo}>
        <h1 className={styles.livePlayerTitle}>LiveStream title</h1>
        <span className={styles.livePlayerMetaData}>
          <p>Streamer Username</p>
          <p>Live timeup</p>
        </span>
        <span className={styles.livePlayerStreamerMetaData}>
          <Hotlink title={""} imgUrl={""} />
          <Hotlink title={""} imgUrl={""} />
          <Hotlink title={""} imgUrl={""} />
          <Hotlink title={""} imgUrl={""} />
          <Hotlink title={""} imgUrl={""} />
          <Hotlink title={""} imgUrl={""} />
        </span>
      </span>
    </>
  );
};
