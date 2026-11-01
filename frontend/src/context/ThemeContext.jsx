import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('pixelix_theme_mode') || 'normal';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pixelix_theme_mode', themeMode);

    // Synchronize Chrome browser tab favicon with active theme
    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = themeMode === 'dark' ? '/dark-mode-logo.png' : '/light-mode-logo.png';
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'normal' : 'dark'));
  };

  const isDark = themeMode === 'dark';

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

export const useTheme = () => {
  return useThemeMode();
};

export default ThemeContext;
