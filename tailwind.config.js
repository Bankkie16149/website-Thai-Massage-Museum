/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: '#23080c',
        'crimson-mid': '#3a1016',
        'crimson-deep': '#190609',
        cream: '#f7efe2',
        pearl: '#fffaf0',
        gold: '#e6c177',
        'gold-soft': '#e2bd78',
        ink: '#2d1014',
        muted: '#d8c2ba',
      },
      fontFamily: {
        sans: ["'Noto Sans Thai'", "'Leelawadee UI'", 'Tahoma', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        museum: '0 24px 70px rgba(18, 4, 6, 0.42)',
      },
    },
  },
  plugins: [],
};
