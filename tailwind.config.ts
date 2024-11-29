import type { Config } from 'tailwindcss';

import { colors } from './src/styles/tokens';
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
