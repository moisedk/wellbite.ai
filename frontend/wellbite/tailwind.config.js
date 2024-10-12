/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'futura' : ['futura', 'sans-serif']
      },
      backgroundImage: {
        'temp_food_bg': "url('/src/assets/Eat-Half-Your-Plate.jpg')"
      }
    },
  },
  plugins: [],
}
