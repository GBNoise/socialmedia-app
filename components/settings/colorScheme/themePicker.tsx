import React from "react";
import styles from "../../../styles/settingscolorscheme.module.scss";
import { Themes } from "../../../constants/types";

interface ThemePickerProps {
  themes: Themes[];
  onClick: Function;
  title: string;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  themes,
  onClick,
  title,
}) => {
  return (
    <div className={styles.colorSchemeContainer}>
      <h3>{title}</h3>
      <span className={styles.themePickers}>
        {themes.map((theme) => {
          const { color, name } = theme;
          return (
            <button
              key={name}
              onClick={() => onClick(color)}
              style={{
                backgroundColor: color,
              }}
            />
          );
        })}
      </span>
    </div>
  );
};
