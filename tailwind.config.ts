import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        neutral: 'var(--color-neutral)',
        surface: 'var(--color-surface)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        'primary-fg': 'var(--color-primary-fg)',
        'secondary-fg': 'var(--color-secondary-fg)',
        'neutral-fg': 'var(--color-neutral-fg)',
        'surface-fg': 'var(--color-surface-fg)',
        'success-fg': 'var(--color-success-fg)',
        'error-fg': 'var(--color-error-fg)',
        'warning-fg': 'var(--color-warning-fg)',
      },
    },
  },
  plugins: [],
} satisfies Config;
