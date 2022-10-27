import React from "react";

export interface ProviderValue {
  state: ChatState;
  dispatch: React.Dispatch<any>;
}

export interface Children {
  children: React.ReactNode;
}

export type SettingsType = {
  icon: JSX.Element;
  name: string;
  cb: Function;
};

export declare type Theme = "dark" | "light" | any;
export declare type AccentColor = any;

export interface Themes {
  name: string;
  color: string;
}

export interface ColorScheme {
  theme: Theme;
  accentColor: string;
}

export interface ColorProvider extends ColorScheme {
  changeTheme(theme: Theme): void;
  changeAccentColor(accentColor: AccentColor): void;
}
export interface SettingsState {
  isActive: boolean;
  selectedSetting: string;
  colorScheme: ColorScheme;
}

export interface CustomSettingsProviderValue extends ProviderValue {
  goBack: Function;
}

// lives

// livesList
export interface LivesListProps {
  title: string;
  endpoint?: string;
}
