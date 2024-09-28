/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      animation: {
        'appear-from-bottom': 'appear_from_bottom 0.2s linear',
        'appear-from-left': 'appear_from_left 0.2s linear',
        'appear-from-right': 'appear_from_right 0.2s linear'
      },
      keyframes: {
        appear_from_bottom: {
          '0%': { transform: 'translateY(1em)', opacity: '0' },
          '100%': { transform: 'transalteY(0)', opacity: '1' }
        },
        appear_from_left: {
          '0%': { transform: 'translateX(-3em)', opacity: '0' },
          '100%': { transform: 'transalteX(0)', opacity: '1' }
        },
        appear_from_right:{
          '0%': { transform: 'translateX(3em)', opacity: '0' },
          '100%': { transform: 'transalteX(0)', opacity: '1' }
        }
      },
      colors: {
        primary: "#ffe1d1",
        secondary: "#c93f3f",
        accent: "#e98888",
        text: "#292929"
      },
      gridTemplateColumns: {
        66: "2fr 1fr"
      },
      gridTemplateRows: {
        sb: "0.5fr 0.5fr 3fr 0.5fr"
      },
      plugins: [
        require("tailwindcss-animation-delay"),
        // ...
      ],
    },
  },
  plugins: [],
}

