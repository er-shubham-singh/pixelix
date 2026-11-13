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
        ivory: {
          50: '#FAF8F5',
          100: '#F7F4EE',
          200: '#EFECE5',
          300: '#E2DDD4',
          400: '#CFBFA8',
          500: '#B29F8D',
          DEFAULT: '#F7F4EE'
        },
        taupe: {
          50: '#F7F5F2',
          100: '#EAE5E0',
          200: '#D8CFC6',
          300: '#BFAFA2',
          400: '#A08E7E',
          500: '#B29F8D',
          600: '#827060',
          700: '#52453B',
          800: '#3D332B',
          900: '#26211E',
          950: '#181513',
          DEFAULT: '#B29F8D'
        },
        cream: {
          50: '#FAF8F5',
          100: '#F7F4EE',
          200: '#EFECE5',
          300: '#E2DDD4',
          400: '#CFBFA8',
          DEFAULT: '#F7F4EE'
        },
        terracotta: {
          50: '#FAF8F5',
          100: '#F5F1E9',
          200: '#EAE5E0',
          300: '#D8CFC6',
          400: '#A08E7E',
          500: '#B29F8D',
          600: '#827060',
          700: '#52453B',
          800: '#3D332B',
          900: '#26211E',
          950: '#181513',
          DEFAULT: '#B29F8D',
          neon: '#D8C8B4',
          mint: '#C7B9A4'
        },
        emerald: {
          50: '#FAF8F5',
          100: '#F5F1E9',
          200: '#EAE5E0',
          300: '#D8CFC6',
          400: '#A08E7E',
          500: '#B29F8D',
          600: '#827060',
          700: '#52453B',
          800: '#3D332B',
          900: '#26211E',
          950: '#181513',
          DEFAULT: '#B29F8D',
          neon: '#D8C8B4',
          mint: '#C7B9A4'
        },
        sunset: {
          light: '#EAE5E0',
          DEFAULT: '#26211E',
          dark: '#181513',
          glow: 'rgba(38, 33, 30, 0.25)'
        },
        gold: {
          light: '#FAF4EC',
          DEFAULT: '#C5A059',
          dark: '#9E7E38',
          sun: '#D4AF37',
          champagne: '#D8C8B4',
          deep: '#A68341'
        },
        sage: {
          light: '#EFECE5',
          DEFAULT: '#A08E7E',
          dark: '#827060'
        },
        espresso: {
          50: '#FAF8F5',
          100: '#EAE5E0',
          200: '#D8CFC6',
          700: '#52453B',
          800: '#3D332B',
          900: '#26211E',
          950: '#181513',
          DEFAULT: '#26211E'
        },
        darkbg: {
          base: '#181513',
          surface: '#231F1C',
          card: '#2A2421',
          border: 'rgba(199, 185, 164, 0.16)',
          elevated: '#342D28'
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
