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
        // Luxury 10 Ivory & Taupe Palette
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
        // Champagne Gold & Brass
        gold: {
          light: '#FAF4EC',
          DEFAULT: '#C5A059',
          dark: '#9E7E38',
          sun: '#D4AF37',
          champagne: '#D8C8B4',
          deep: '#A68341'
        },
        sunset: {
          light: '#EAE5E0',
          DEFAULT: '#26211E',
          dark: '#181513',
          glow: 'rgba(38, 33, 30, 0.25)'
        },
        sage: {
          light: '#EFECE5',
          DEFAULT: '#A08E7E',
          dark: '#827060'
        },
        // Soft Silk Ivory Cream for Light Mode
        cream: {
          50: '#FAF8F5',
          100: '#F7F4EE',
          200: '#EFECE5',
          300: '#E2DDD4',
          400: '#CFBFA8',
          DEFAULT: '#F7F4EE'
        },
        // High Contrast Warm Charcoal Taupe / Espresso
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
        // Luxury Velvet Espresso-Taupe Noir Dark Mode
        darkbg: {
          base: '#181513',     // deep velvet taupe-charcoal
          surface: '#231F1C',  // elevated dark taupe surface
          card: '#2A2421',     // taupe glass card base
          border: 'rgba(199, 185, 164, 0.16)', // subtle champagne silk border
          elevated: '#342D28'  // elevated section
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'sunset': '0 20px 40px -15px rgba(38, 33, 30, 0.25)',
        'sunset-lg': '0 25px 50px -12px rgba(38, 33, 30, 0.35)',
        'gold': '0 20px 40px -15px rgba(178, 159, 141, 0.25)',
        'gold-lg': '0 25px 50px -12px rgba(178, 159, 141, 0.4)',
        'glass': '0 8px 32px 0 rgba(38, 33, 30, 0.06)',
        'soft': '0 10px 30px -5px rgba(38, 33, 30, 0.08)',
        '3d': '0 30px 60px -15px rgba(38, 33, 30, 0.2), 0 0 25px rgba(216, 200, 180, 0.2)',
        'glow-dark': '0 0 30px rgba(199, 185, 164, 0.2)',
        'glow-emerald': '0 0 25px rgba(178, 159, 141, 0.3)',
        'glow-gold': '0 0 25px rgba(216, 200, 180, 0.35)'
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
