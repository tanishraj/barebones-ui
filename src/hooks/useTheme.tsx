import { useEffect, useState } from 'react';

export const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

export type Theme = (typeof themes)[number];

export type UseThemeOptions = {
  themes: Theme[];
  defaultTheme?: string;
};

export const useTheme = ({ defaultTheme, themes }: UseThemeOptions) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window === 'undefined') return defaultTheme || themes[0];
    const savedTheme = localStorage.getItem('theme');
    return themes.includes(savedTheme!)
      ? savedTheme!
      : defaultTheme || themes[0];
  });
  const fallbackTheme = defaultTheme || themes[0];
  const resolvedTheme = themes.includes(currentTheme)
    ? currentTheme
    : fallbackTheme;

  useEffect(() => {
    if (typeof window !== 'undefined' && resolvedTheme) {
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      localStorage.setItem('theme', resolvedTheme);
    }
  }, [resolvedTheme]);

  const setTheme = (theme: string) => {
    if (themes.includes(theme)) setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    if (themes.length === 0) return;
    const currentIndex = Math.max(themes.indexOf(resolvedTheme), 0);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  return { currentTheme: resolvedTheme, setTheme, toggleTheme };
};
