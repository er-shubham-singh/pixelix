/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#F2FAF5',
          100: '#E6F5EC',
          200: '#D1ECDD',
          300: '#B2DFC6',
          400: '#8CCEA9',
          DEFAULT: '#F2FAF5'
        },
        terracotta: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
          DEFAULT: '#10B981',
          neon: '#00FF87',
          mint: '#00DF82'
        },
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
          DEFAULT: '#10B981',
          neon: '#00FF87',
          mint: '#00DF82'
        },
        sunset: {
          light: '#BBF7D0',
          DEFAULT: '#00DF82',
          dark: '#059669',
          glow: 'rgba(0, 223, 130, 0.35)'
        },
        gold: {
          light: '#FDF6E2',
          DEFAULT: '#F5D485',
          dark: '#C89B3C',
          sun: '#FBE29D',
          champagne: '#F5D485',
          deep: '#D4A346'
        },
        sage: {
          light: '#E6F4EA',
          DEFAULT: '#10B981',
          dark: '#047857'
        },
        espresso: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          700: '#143527',
          800: '#0B251A',
          900: '#04160F',
          950: '#020B07',
          DEFAULT: '#04160F'
        },
        darkbg: {
          base: '#02140D',
          surface: '#052015',
          card: '#082C1E',
          border: 'rgba(0, 223, 130, 0.16)',
          elevated: '#0D3827'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'sunset': '0 20px 40px -15px rgba(0, 223, 130, 0.25)',
        'sunset-lg': '0 25px 50px -12px rgba(0, 223, 130, 0.35)',
        'gold': '0 20px 40px -15px rgba(245, 212, 133, 0.3)',
        'gold-lg': '0 25px 50px -12px rgba(245, 212, 133, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 223, 130, 0.08)',
        'soft': '0 10px 30px -5px rgba(2, 20, 13, 0.25)',
      }
    },
  },
  plugins: [],
}
