import type { Config } from 'tailwindcss';

import { semanticColors, baseColors, typography } from './src/styles/tokens';

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...baseColors,
    },
    extend: {
      ...semanticColors,
      ...typography,
    },
  },
  plugins: [],
} satisfies Config;
