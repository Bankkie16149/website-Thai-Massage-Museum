/** @type {import('tailwindcss').Config} */
const MONTSERRAT_STACK = [
  "'Montserrat Variable'",
  "'Montserrat'",
  "'Noto Sans Thai Variable'",
  "'Noto Sans Thai'",
  "'Noto Sans SC Variable'",
  "'Noto Sans KR Variable'",
  "'Noto Sans Devanagari Variable'",
  "'Leelawadee UI'",
  'Tahoma',
  'Arial',
  'sans-serif',
];

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
        sans: MONTSERRAT_STACK,
        serif: MONTSERRAT_STACK,
      },
      boxShadow: {
        museum: '0 24px 70px rgba(18, 4, 6, 0.42)',
      },
    },
  },
  plugins: [],
};
