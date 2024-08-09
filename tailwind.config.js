/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors:{
        primary: "#e0b790",
        secondary: "#572e08",
        accent: "#a1cf84"
      },
      gridTemplateColumns:{
        66: "2fr 1fr"
      },
      gridTemplateRows:{
        sb: "1fr 4fr 0.5fr"
      }
    },
  },
  plugins: [],
}

