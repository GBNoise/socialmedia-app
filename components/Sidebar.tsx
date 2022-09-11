import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faHeadset,
  faImages,
  faToolbox,
  faTowerBroadcast,
  faVideo,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

declare type OptionsType = {
  name: string;
  icon: IconDefinition;
};

const Sidebar = () => {
  const sidebarRef = useRef<HTMLElement>(null);

  const options: OptionsType[] = [
    { name: "Posts", icon: faImages },
    { name: "Videos", icon: faVideo },
    { name: "Lives", icon: faTowerBroadcast },
    { name: "Rooms", icon: faHeadset },
  ];

  const settings: OptionsType[] = [
    { name: "Notifications", icon: faBell },
    { name: "Support", icon: faToolbox },
    { name: "Settings", icon: faCog },
  ];

  return (
    <>
      <aside className={styles.sidebar} ref={sidebarRef}>
        <ul>
          {options.map(({ name, icon }) => {
            return (
              <li>
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

        <ul>
          {settings.map(({ name, icon }) => {
            return (
              <li>
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

        <footer>© 2022 Copyright</footer>
      </aside>
    </>
  );
};

export default Sidebar;
