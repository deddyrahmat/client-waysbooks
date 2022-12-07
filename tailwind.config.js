/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'tinos': ['"Tinos"', 'serif'],
      },
      screens: {
        xs: "360px", //double xtra small
        xxl: "1440px",
        '2xl' : "1440px"
      },
    },
  },
  plugins: [],
}
