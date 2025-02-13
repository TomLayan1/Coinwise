/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#00001a',
        primaryColor: '#47a3ff',
        grayLight: '#424242',
        grayBg: '#0000003f'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
          sm: '3rem'
        }
      },
      boxShadow: {
        customShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      }
  }
},
  plugins: [],
}