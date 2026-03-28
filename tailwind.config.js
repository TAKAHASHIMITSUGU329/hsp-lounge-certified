/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        marble: {
          50: '#FDFBF8',
          100: '#FAF6F0',
          200: '#F5EDE0',
          300: '#EDE3D3',
          400: '#D6C9B6',
          500: '#C4B5A0',
        },
        gold: {
          100: '#F5E6C8',
          200: '#E8D5A8',
          300: '#D4BC7E',
          400: '#C5A052',
          500: '#B08B3E',
          600: '#8C6F32',
        },
        salmon: {
          100: '#FBE8E2',
          200: '#F2C4B8',
          300: '#E8967D',
          400: '#D97B62',
        },
        dark: {
          800: '#2C2520',
          900: '#1A1512',
        },
      },
      fontFamily: {
        serif: ['"Domine"', '"Noto Serif JP"', 'serif'],
        body: ['"Literata"', '"Noto Sans JP"', 'serif'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
