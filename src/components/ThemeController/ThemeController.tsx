import React, { useState } from 'react';

// List of available themes from DaisyUI
const themes = [
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

export const ThemeController = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost'>
        <span>Theme</span>
        <svg
          width='12px'
          height='12px'
          className='h-4 w-4 fill-current opacity-60'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'
        >
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z' />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl'
      >
        {themes.map(theme => (
          <li key={theme}>
            <button
              className='btn btn-ghost btn-sm w-full justify-start'
              onClick={() => handleThemeChange(theme)}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
