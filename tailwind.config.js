/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slide:{
          '0%':{transform:'translateX(-100%)'},
          '100%':{transform:'translateX(0)'}
        }
      },
      animation:{
        sidebar_open:'slide .3s ease-in-out forwards',
        sidebar_close:'slide .3s ease-in-out backwards'
      }
    },
  },
  plugins: [],
}

