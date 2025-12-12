/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // for Next.js (src folder)
    "./app/**/*.{js,ts,jsx,tsx}", // if using App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // (corrected spelling)
      },
      gridTemplateColumns: {
        "70/30": "70% 20%",  // or 28% if you want
      },
    },
  },
  plugins: [],
};