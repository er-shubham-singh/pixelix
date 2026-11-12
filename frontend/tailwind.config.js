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
        // Luxury Mint & Emerald (Matches Pixelix tech & creative brand)
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
        // Champagne Gold (Matches buttons & orbital highlights from images)
        gold: {
          light: '#FDF6E2',
          DEFAULT: '#F5D485',
          dark: '#C89B3C',
          sun: '#FBE29D',
          champagne: '#F5D485',
          deep: '#D4A346'
        },
        sunset: {
          light: '#BBF7D0',
          DEFAULT: '#00DF82',
          dark: '#059669',
          glow: 'rgba(0, 223, 130, 0.35)'
        },
        sage: {
          light: '#E6F4EA',
          DEFAULT: '#10B981',
          dark: '#047857'
        },
        // Soft Mint Cream for Light Mode
        cream: {
          50: '#F2FAF5',
          100: '#E6F5EC',
          200: '#D1ECDD',
          300: '#B2DFC6',
          400: '#8CCEA9',
          DEFAULT: '#F2FAF5'
        },
        // High Contrast Deep Forest for Text in Light Mode
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
        // Luxury Obsidian Emerald Dark Mode (From reference screenshot)
        darkbg: {
          base: '#02140D',     // deep obsidian emerald
          surface: '#052015',  // dark emerald surface
          card: '#082C1E',     // emerald glass card base
          border: 'rgba(0, 223, 130, 0.16)', // subtle luminous green border
          elevated: '#0D3827'  // elevated emerald section
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
        '3d': '0 30px 60px -15px rgba(0, 223, 130, 0.25), 0 0 25px rgba(245, 212, 133, 0.2)',
        'glow-dark': '0 0 30px rgba(0, 223, 130, 0.25)',
        'glow-emerald': '0 0 25px rgba(0, 223, 130, 0.35)',
        'glow-gold': '0 0 25px rgba(245, 212, 133, 0.35)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
