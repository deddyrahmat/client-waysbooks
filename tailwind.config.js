/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
        xs: "360px",
        sm: '640px',
        md: '768px',
        lg: '1024px',
        // xl: '1280px',
        xxl: "1440px",
        "2xl" : "1440px"
    },
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'tinos': ['"Tinos"', 'serif'],
      },
      
    },
  },
  plugins: [],
}
