/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#A387FF',
        },
        'alt-color': 'var(--ifm-text-alt-color)',
        'accent-color': 'var(--ifm-accent-color)',
        'card': 'var(--ifm-card-background)',
        'border': 'var(--ifm-border-color)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
