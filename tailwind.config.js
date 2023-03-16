/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '5rem',
        lg: '6rem',
        xl: '7rem',
        '2xl': '8rem',
      },
    },
  },
  plugins: [],
}
