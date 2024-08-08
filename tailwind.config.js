/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors:{
        primary: "#e0b790",
        secondary: "#572e08"
      },
      gridTemplateColumns:{
        66: "2fr 1fr"
      }
    },
  },
  plugins: [],
}

