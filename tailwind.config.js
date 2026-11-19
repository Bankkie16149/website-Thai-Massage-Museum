/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: '#0b2526',
        forest: '#124240',
        'forest-deep': '#102721',
        cream: '#f5efe3',
        pearl: '#fff8eb',
        gold: '#e6c177',
        'gold-soft': '#e2bd78',
        ink: '#213831',
        muted: '#b9c8bb',
        mint: '#cedfce',
      },
      fontFamily: {
        sans: ["'Noto Sans Thai'", "'Leelawadee UI'", 'Tahoma', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        museum: '0 24px 70px rgba(4,18,14,.27)',
      },
    },
  },
  plugins: [],
};
