import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          900: '#0B1121',
          800: '#0F172A',
          700: '#1E293B',
          600: '#1a2744',
        },
        electric: {
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
        },
        teal: {
          500: '#14B8A6',
          400: '#2DD4BF',
          600: '#0D9488',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0B1121 0%, #0F172A 50%, #1E293B 100%)',
        'gradient-electric': 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(20,184,166,0.1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
