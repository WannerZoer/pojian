import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const applyTheme = (themeSetting) => {
      if (themeSetting === 'system') {
        const now = new Date();
        const hour = now.getHours();
        const isDark = hour >= 19 || hour < 7;
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        document.documentElement.classList.toggle('dark', themeSetting === 'dark');
      }
    };

    localStorage.setItem('theme', theme);
    applyTheme(theme);

    if (theme === 'system') {
      const checkTime = () => {
        applyTheme('system');
      };
      const interval = setInterval(checkTime, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};