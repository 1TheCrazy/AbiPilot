import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const themes = {
  dark: {
    backgroundColor: 'rgb(32, 32, 46)',
    navbarColor: 'rgb(19, 19, 27)',
    navitemActiveColor: 'rgb(255, 255, 255)',
    navitemInactiveColor: 'rgb(112, 112, 112)',
    fontColor: 'rgb(223, 223, 223)',
    courseCardBorderColor: '#aaa',
    hrColor: '#ccc',
    transparentAccent: 'rgba(255, 255, 255, 0.25)'
  },
  light: {
    /* Fill with actual light styles */
    backgroundColor: 'rgb(6, 6, 143)',
    navbarColor: 'rgb(10, 10, 129)',
    navitemActiveColor: 'rgb(185, 11, 11)',
    navitemInactiveColor: 'rgb(201, 81, 81)',
    fontColor: 'rgb(66, 16, 16)',
    courseCardBorderColor: '#aaa',
    hrColor: '#ccc',
    transparentAccent: 'rgba(255, 255, 255, 0.6)'
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
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <ThemeContext.Provider value={{ colors: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access styles + setTheme
export const useTheme = () => useContext(ThemeContext);

export type ThemeType = typeof themes.dark;