/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ef6b6e",
        secondary: "#f7ed7e",
      },
    },
  },
  plugins: [],
}