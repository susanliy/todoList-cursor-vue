/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        background: {
          light: '#f0f4f8',
          dark: '#0f1729',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        }
      },
      backgroundImage: {
        'tech-pattern-light': 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.1) 0%, transparent 40%), radial-gradient(#e0e7ff 0.5px, transparent 0.5px)',
        'tech-pattern-dark': 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.1) 0%, transparent 40%), radial-gradient(#1e293b 0.5px, transparent 0.5px)',
      },
      backgroundSize: {
        'tech-grid': '100% 100%, 20px 20px',
      },
      animation: {
        'slide-in': 'slideIn 0.2s ease-out',
        'slide-out': 'slideOut 0.2s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 