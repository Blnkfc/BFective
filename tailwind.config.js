/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors:{
        primary: "#ffe1d1",
        secondary: "#c93f3f",
        accent: "#e98888",
        text: "#292929"
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

