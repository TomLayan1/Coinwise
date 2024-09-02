/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px'
    },
    extend: {
      colors: {
        primaryBg: '#00001a',
        primaryColor: '#47a3ff',
        grayLight: '#424242',
        grayBg: '#0000003f'
      },
      boxShadow: {
        customShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      }
  }
},
  plugins: [],
}