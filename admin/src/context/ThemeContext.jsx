import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('pixelix_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('pixelix_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('pixelix_theme', 'light');
    }

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = isDark ? '/dark-mode-logo.png' : '/light-mode-logo.png';
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
}

export const useTheme = useThemeMode;
export default ThemeContext;

