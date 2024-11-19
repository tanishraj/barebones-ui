import { colors } from './src/styles/tokens';
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
