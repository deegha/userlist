import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tBase: 'var(--color-text-base)',
        tUnSelected: 'var(--color-text-unselected)',
        tHover: 'var(--color-text-hover)',
        bgPrimary: 'var(--color-bg-primary)',
        bgSecondary: 'var(--color-bg-secondary)',
        border: 'var(--color-border)',
        bgForm: 'var(--color-bg-form)',
        bgTextInput: 'var(--color-bg-text-input)',
        colorTextInput: 'var(--color-text-input)',
      },
    },
    keyframes: {
      appear: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      appear: 'appear 0.5s ease-out',
    },
  },
  plugins: [],
} satisfies Config;
