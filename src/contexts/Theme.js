import { createContext, useContext, useEffect, useState } from 'react';

const Theme = createContext();

export function ThemeProvider({ children }) {
  const [themeState, setThemeState] = useState('dark');

  const handleChangeTheme = () => {
    setThemeState(!themeState);
    if (themeState) {
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
      setThemeState(getTheme);
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
