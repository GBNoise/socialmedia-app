import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faHeadset,
  faHome,
  faImages,
  faMessage,
  faToolbox,
  faTowerBroadcast,
  faVideo,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { settingsContext } from "../contexts/settings/settingsContext";

declare type OptionsType = {
  name: string;
  icon: IconDefinition;
  to?: string;
  cb?: Function;
};

const Sidebar = () => {
  const sidebarRef = useRef<HTMLElement>(null);
  const { pathname } = useRouter();
  const { state, dispatch } = useContext(settingsContext);

  const options: OptionsType[] = [
    { name: "Home", icon: faHome, to: "/" },
    { name: "Posts", icon: faImages, to: "/posts" },
    { name: "Videos", icon: faVideo, to: "/videos" },
    { name: "Lives", icon: faTowerBroadcast, to: "/lives" },
    { name: "Rooms", icon: faHeadset, to: "/rooms" },
    { name: "Chats", icon: faMessage, to: "/chats" },
  ];

  const settings: OptionsType[] = [
    { name: "Notifications", icon: faBell },
    { name: "Support", icon: faToolbox },
    {
      name: "Settings",
      icon: faCog,
      cb: () => {
        dispatch({ type: "toggleIsActive" });
      },
    },
  ];

  const createBtn = {
    "/": "Create a new post",
    "/posts": "Create a new post",
    "/videos": "Upload a new video",
    "/lives": "Start a live",
    "/rooms": "Create a new room",
    "/chats": "Start a new chat",
  }[pathname];

  return (
    <>
      <aside className={styles.sidebar} ref={sidebarRef}>
        <ul>
          {options.map(({ name, icon, to }) => {
            return (
              <li key={name}>
                <Link href={to || ""}>
                  <span>
                    <FontAwesomeIcon
                      icon={icon}
                      size="1x"
                      className={styles.icon}
                    />
                    <p>{name}</p>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul>
          {settings.map(({ name, icon, cb }) => {
            return (
              <li key={name} onClick={() => (cb ? cb() : () => undefined)}>
                <FontAwesomeIcon
                  icon={icon}
                  size="1x"
                  className={styles.icon}
                />
                <p>{name}</p>
              </li>
            );
          })}
        </ul>

        <button className={styles.newBtn}>{createBtn}</button>
        <footer>© 2022 Copyright</footer>
      </aside>
    </>
  );
};

export default Sidebar;
