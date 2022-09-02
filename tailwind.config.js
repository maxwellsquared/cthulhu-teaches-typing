/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // configured to look for all files in the src folder
  ],
  theme: {
    // theme is where you can configure the colors, spacing, etc.
    colors: {
      'cosmic-purple': '#1C122C',
      'pale-gold': '#EEDCB2',
      'blood-red': '#8C3D34',
      'candle': '#E9B12E',
    },
    fontFamily: {
      // if changing, import font into 'src/index.css'
      // font-family: brother-1816, sans-serif;

      sans: ['brother-1816', 'sans-serif'],
      serif: ['Anonymous Pro', 'serif'],
      timer: ['Chakra Petch', 'sans-serif'],
      mono: ['courier-prime', 'monospace']
    },
    extend: {},
  },
  plugins: [],
};