import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          surface: '#f7f9fb',
          'surface-dim': '#d8dadc',
          'surface-bright': '#f7f9fb',
          primary: '#00236f',
          'primary-container': '#1e3a8a',
          secondary: '#006398',
          'secondary-container': '#5bb8fe',
          tertiary: '#f59e0b',
          error: '#ba1a1a',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
