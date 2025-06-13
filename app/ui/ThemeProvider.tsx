import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { StatusBar } from 'react-native';

import { Client } from "../client/SaveSystem"

type Theme = 'light' | 'dark';

const themes = {
  dark: {
    backgroundColor: 'rgb(32, 32, 46)',
    navbarColor: 'rgb(19, 19, 27)',
    navitemActiveColor: 'rgb(255, 255, 255)',
    navitemInactiveColor: 'rgb(112, 112, 112)',
    fontColor: 'rgb(223, 223, 223)',
    lightFontColor: 'rgb(139, 134, 151)',
    courseCardBorderColor: '#aaa',
    hrColor: '#ccc',
    transparentAccent: 'rgba(255, 255, 255, 0.25)',
    highlightBlue: 'rgb(85, 142, 248)',
    infoYellow: 'rgb(153, 155, 54)',
    bottomSheetColor: 'rgb(131, 131, 131)',
  },
  light: {
    backgroundColor: 'rgb(170, 174, 190)',
    navbarColor: 'rgb(147, 150, 165)',
    navitemActiveColor: 'rgb(44, 44, 44)',
    navitemInactiveColor: 'rgb(100, 100, 100)',
    fontColor: 'rgb(27, 27, 27)',
    lightFontColor: 'rgb(66, 66, 66)',
    courseCardBorderColor: 'rgb(32, 32, 32)',
    hrColor: 'rgb(24, 24, 24)',
    transparentAccent: 'rgba(68, 68, 68, 0.6)',
    highlightBlue: 'rgb(0, 41, 117)',
    infoYellow: 'rgb(153, 155, 54)',
    bottomSheetColor: 'rgb(163, 163, 163)',
  },
};

const ThemeContext = createContext<{
  colors: typeof themes.dark;
  setTheme: (theme: Theme) => void;
}>({
  colors: themes.dark,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get system Theme, if undefined default to dark
  let sysTheme = useColorScheme();
  sysTheme = sysTheme ? sysTheme : 'dark';

  // Init on Startup
  const [theme, setTheme] = useState<Theme>(Client.settings.theme == 'system' ?  sysTheme : Client.settings.theme);
  Theme = theme;

  // When theme updates
  useEffect(() => {
    // Set icon style for nav items on android
    changeNavigationBarColor('transparent', theme ==='dark' ? false : true); // This doesn't seem to work consistently if theme is changed rapidly (mainly only works on startup)
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');

    Theme = theme;
  }, [theme])

  return (
    <ThemeContext.Provider value={{ colors: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access styles + setTheme
export const useTheme = () => useContext(ThemeContext);

export type ThemeType = typeof themes.dark;

export let Theme: Theme;