import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00236f',
          container: '#1e3a8a',
          hover: '#001a54',
          fixed: '#dce1ff',
          'fixed-dim': '#b6c4ff',
        },
        secondary: {
          DEFAULT: '#0284c7',
          container: '#5bb8fe',
          hover: '#0369a1',
          fixed: '#cce5ff',
        },
        tertiary: {
          DEFAULT: '#f59e0b',
          container: '#5c3800',
          hover: '#d97706',
          fixed: '#ffddb8',
        },
        surface: {
          DEFAULT: '#ffffff',
          bright: '#f7f9fb',
          dim: '#d8dadc',
          container: '#eceef0',
          'container-low': '#f2f4f6',
          'container-high': '#e6e8ea',
          'container-highest': '#e0e3e5',
        },
        on: {
          surface: '#191c1e',
          'surface-variant': '#444651',
          primary: '#ffffff',
          secondary: '#ffffff',
        },
        outline: {
          DEFAULT: '#cbd5e1',
          variant: '#e2e8f0',
        },
        status: {
          success: '#16a34a',
          'success-bg': '#dcfce7',
          warning: '#d97706',
          'warning-bg': '#fef3c7',
          danger: '#dc2626',
          'danger-bg': '#fee2e2',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Inter', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        latin: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.05)',
        elevated: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        modal: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
