import React from 'react';

import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center space-x-4'>
      <button
        onClick={() => setTheme('light')}
        className={`rounded-md p-2 ${
          theme === 'light'
            ? 'bg-primary text-white'
            : 'bg-neutral-bg text-text-primary dark:bg-dark-neutral-bg dark:text-dark-primary'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`rounded-md p-2 ${
          theme === 'dark'
            ? 'bg-primary text-white'
            : 'bg-priimary text-primary-fg dark:bg-dark-neutral-bg dark:text-dark-primary'
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`rounded-md p-2 ${
          theme === 'system'
            ? 'bg-primary text-white'
            : 'bg-neutral-bg text-text-primary dark:bg-dark-neutral-bg dark:text-dark-primary'
        }`}
      >
        System
      </button>
    </div>
  );
};

export default ThemeToggle;
