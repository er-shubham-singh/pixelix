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
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDC9',
          400: '#DEC9AC',
          DEFAULT: '#FAF6EE'
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#FCE7DF',
          200: '#F8D1C3',
          300: '#F1B29E',
          400: '#E58A6E',
          500: '#D9532F',
          600: '#C84523',
          700: '#B03618',
          800: '#8E2C14',
          900: '#722512',
          DEFAULT: '#C84523'
        },
        sunset: {
          light: '#F8D1C3',
          DEFAULT: '#E07A5F',
          dark: '#B8431E',
          glow: 'rgba(217, 83, 47, 0.25)'
        },
        gold: {
          light: '#F3DFC1',
          DEFAULT: '#D4A373',
          dark: '#B07D48',
          sun: '#E9C46A'
        },
        sage: {
          light: '#D3DFD7',
          DEFAULT: '#7F9C8D',
          dark: '#587364'
        },
        espresso: {
          50: '#F6F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          DEFAULT: '#1C1917'
        },
        darkbg: {
          base: '#12100E',
          surface: '#1A1715',
          card: '#221E1C',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'sunset': '0 20px 40px -15px rgba(200, 69, 35, 0.2)',
        'sunset-lg': '0 25px 50px -12px rgba(200, 69, 35, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'soft': '0 10px 30px -5px rgba(28, 25, 23, 0.05)',
        '3d': '0 30px 60px -15px rgba(200, 69, 35, 0.2), 0 0 20px rgba(244, 162, 97, 0.15)',
        'glow-dark': '0 0 25px rgba(217, 83, 47, 0.2)'
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
