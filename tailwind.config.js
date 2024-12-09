import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#A387FF', // TODO: Extract
        },
        'alt-color': 'var(--ifm-text-alt-color)',
        'accent-color': 'var(--ifm-accent-color)',
        card: 'var(--ifm-card-background)',
        border: 'var(--ifm-border-color)',
        button: { // TODO Extract
          light: '#E9EDF2',
          dark: '#252A2E',
        }
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ],

  corePlugins: {
    preflight: false,
  },
};
