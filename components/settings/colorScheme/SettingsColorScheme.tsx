import React, { useContext } from "react";
import { settingsContext } from "../../../contexts/settings/settingsContext";
import { colorSchemeContext } from "../../../contexts/settings/colorSchemeContext";
import styles from "../../../styles/settingscolorscheme.module.scss";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Themes } from "../../../constants/types";
import { ThemePicker } from "./themePicker";

export const SettingsColorScheme = () => {
  const { state, dispatch, goBack } = useContext(settingsContext);
  const { changeTheme, changeAccentColor } = useContext(colorSchemeContext);

  const themes: Themes[] = [
    { name: "light", color: "#fff" },
    { name: "dark", color: "#000" },
    { name: "dracula", color: "#282a36" },
    { name: "gruvbox dark", color: "#282828" },
    { name: "gruvbox light", color: "#fbf1c7" },
  ];

  const accents: Themes[] = [
    { name: "pink accent", color: "rgba(254, 44, 85, 1)" },
    { name: "dracula accent", color: "#bd93f9" },
    { name: "purple accent", color: "#7856FF" },
    { name: "gruvbox dark accent", color: "#fb3944" },
    { name: "green accent", color: "#00BA7C" },
    { name: "yellow accent", color: "#FFD500" },
  ];

  return (
    <div className={styles.settingsColorSchemeContainer}>
      <h2>Theme Settings</h2>
      <ArrowLeftIcon onClick={() => goBack()} className={styles.backIcon} />
      <ThemePicker themes={themes} onClick={changeTheme} title={"Themes"} />
      <ThemePicker
        themes={accents}
        onClick={changeAccentColor}
        title={"Accent Color"}
      />
    </div>
  );
};
