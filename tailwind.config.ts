/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      darkBlue: '#001E3C'
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
