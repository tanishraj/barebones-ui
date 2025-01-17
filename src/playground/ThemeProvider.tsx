import React, { createContext, useEffect, useState, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    return 'system'; // Default to system theme
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Determine the active theme
    let activeTheme = theme;

    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      activeTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // Update HTML attributes
    root.classList.toggle('dark', activeTheme === 'dark');
    root.setAttribute('data-theme', activeTheme);

    // Persist the user's theme choice
    localStorage.setItem('theme', theme);
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
