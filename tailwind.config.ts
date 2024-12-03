import type { Config } from 'tailwindcss';

import { semanticColors, baseColors } from './src/styles/tokens/colors';

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...baseColors,
    },
    extend: {
      ...semanticColors,
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
