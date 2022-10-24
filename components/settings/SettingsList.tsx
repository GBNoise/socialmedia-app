import styles from "../../styles/settings.module.scss";
import {
  AdjustmentsVerticalIcon,
  BellIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useMemo, useState } from "react";
import { SettingsType } from "../../constants/types";
import { settingsContext } from "../../contexts/settings/settingsContext";

export const SettingsList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = (e: any) => setSearchValue(e.target.value);
  const { state, dispatch } = useContext(settingsContext);
  const handleSettingClick = (name: string) => {
    dispatch({ type: "setSelectedSetting", payload: name });
  };

  const settings = useMemo<SettingsType[]>(() => {
    let settings = [
      { icon: <SwatchIcon />, name: "color scheme", cb: () => null },
      {
        icon: <AdjustmentsVerticalIcon />,
        name: "privacy settings",
        cb: () => null,
      },
      { icon: <BellIcon />, name: "notification settings", cb: () => null },
      { icon: <UserIcon />, name: "account settings", cb: () => null },
      { icon: <KeyIcon />, name: "hotkeys", cb: () => null },
    ];

    return searchValue
      ? settings.filter(({ name }) => name.includes(searchValue))
      : settings;
  }, [searchValue]);

  return (
    <>
      <span className={styles.searchBox}>
        <MagnifyingGlassIcon />
        <input
          type="text"
          placeholder="Type to search..."
          value={searchValue}
          onChange={handleSearchChange}
          spellCheck={false}
        />
      </span>
      <ul className={styles.settingsList}>
        {settings.map((setting) => {
          const { icon, name, cb } = setting;
          return (
            <li key={name} onClick={() => handleSettingClick(name)}>
              {icon}
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
