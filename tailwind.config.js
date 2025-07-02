/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F2FF',
          100: '#E9E7FF',
          200: '#D7D3FF',
          300: '#BCB4FF',
          400: '#9C8AFF',
          500: '#5B4FE8',
          600: '#4C3FD1',
          700: '#3D31A8',
          800: '#2E2580',
          900: '#1F1A57'
        },
        secondary: {
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFCCCC',
          300: '#FFB3B3',
          400: '#FF8A8A',
          500: '#FF6B6B',
          600: '#E55555',
          700: '#CC4444',
          800: '#B23333',
          900: '#992222'
        },
        accent: {
          50: '#F0FDFC',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#4ECDC4',
          600: '#14B8A6',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A'
        }
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'canvas': '0 2px 16px rgba(0, 0, 0, 0.08)'
      },
      animation: {
        'pulse-success': 'pulse 0.5s ease-in-out',
        'scale-up': 'scale-up 0.2s ease-out',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}