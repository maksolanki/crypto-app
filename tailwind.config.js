/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '4rem',
        lg: '5rem',
        xl: '6rem',
        '2xl': '7rem',
      },
    },
  },
  plugins: [],
}
