import type { Config } from 'tailwindcss';

import { colors, semanticColors } from './src/styles/tokens';
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      ...semanticColors,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
