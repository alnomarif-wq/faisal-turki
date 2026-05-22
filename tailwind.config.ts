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
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50: '#f8f8fa',
          100: '#e8e8ef',
          200: '#c5c5d5',
          300: '#9494ab',
          400: '#636380',
          500: '#3d3d5c',
          600: '#252540',
          700: '#1a1a2e',
          800: '#111118',
          900: '#0A0A0F',
          950: '#050508',
        },
        accent: {
          blue: '#3B82F6',
          green: '#10B981',
          red: '#EF4444',
          purple: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111118 0%, #0A0A0F 100%)',
        'gradient-card': 'linear-gradient(135deg, #1a1a2e 0%, #111118 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(245, 158, 11, 0.3)',
        'gold-lg': '0 0 60px rgba(245, 158, 11, 0.4)',
        'gold-sm': '0 0 15px rgba(245, 158, 11, 0.2)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' },
          'to': { textShadow: '0 0 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.4)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
