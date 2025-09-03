/** @type {import('tailwindcss').Config} */

module.exports = {

  content: ["./src/**/*.{html,js}"],

  theme: {

    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          dark: '#0891B2',
        },
        surface: {
          900: '#0B1220',
          800: '#111827',
          700: '#1F2937',
        },
      },
      boxShadow: {
        glow: '0 10px 30px rgba(34,211,238,0.35)',
      },
    },

  },

  plugins: [],

};
