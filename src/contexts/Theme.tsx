/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

type IThemeContext = {
  handleChangeTheme: () => void;
  themeState: string;
};

const Theme = createContext<IThemeContext>({} as any);

export function ThemeProvider({ children }: any) {
  const [themeState, setThemeState] = useState('dark');
  const [theme, setTheme] = useState(false);

  const handleChangeTheme = () => {
    setThemeState(themeState === 'dark' ? 'light' : 'dark');
    setTheme(!theme);
    if (theme) {
      localStorage.setItem('@theme', 'light');
      document.body.classList.add('light-mode');
    } else {
      localStorage.setItem('@theme', 'dark');
      document.body.classList.remove('light-mode');
    }
  };

  useEffect(() => {
    const getTheme = localStorage.getItem('@theme');
    if (getTheme === 'light') {
      setThemeState(getTheme);
      document.body.classList.add('light-mode');
    } else {
      setThemeState(getTheme === 'dark' ? 'dark' : 'light');
      document.body.classList.remove('light-mode');
    }
  }, []);

  return (
    <Theme.Provider
      value={{
        handleChangeTheme,
        themeState,
      }}
    >
      {children}
    </Theme.Provider>
  );
}

export function useTheme() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
