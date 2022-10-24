import React, { useContext, useState, useMemo } from "react";
import styles from "../../styles/settings.module.scss";
import { settingsContext } from "../../contexts/settings/settingsContext";
import {
  AdjustmentsVerticalIcon,
  BellIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SettingsType } from "../../constants/types";
import { SettingsList } from "./SettingsList";
import { SettingsColorScheme } from "./colorScheme/SettingsColorScheme";

export const SettingsContainer = () => {
  const { state, dispatch } = useContext(settingsContext);
  const closeSettings = () => dispatch({ type: "toggleIsActive" });

  const renderSetting = () => {
    switch (state.selectedSetting) {
      case "color scheme":
        return <SettingsColorScheme />;
      default:
        return <SettingsList />;
    }
  };

  return (
    <div className={styles.settingsContainer} onClick={closeSettings}>
      <div className={styles.settings} onClick={(e) => e.stopPropagation()}>
        {renderSetting()}
      </div>
    </div>
  );
};
