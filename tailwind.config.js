/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // configured to look for all files in the src folder
  ],
  theme: {
    extend: {
      // theme is where you can configure the colors, spacing, etc.
      colors: {
        'cosmic-purple': '#1C122C',
        'lighter-purple': '#1C122B',
        'pale-gold': '#EEDCB2',
        'gold-hover': '#EAC775',
        'blood-red': '#8C3D34',
        'blood-red-hover': '#662C26',
        candle: '#E9B12E',
        'link-green': '#2D888C',
        incorrectInput: 'rgba(248, 41, 41, 0.09)',
      },
      fontFamily: {
        // if changing, import font into 'src/index.css'
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Anonymous Pro', 'serif'],
        timer: ['Chakra Petch', 'sans-serif'],
        brother: ['brother-1816', 'sans-serif'],
      },
      minWidth: {
        45: '45px',
      },
    },
  },
};
