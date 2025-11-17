/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4C82F7",
        background: {
          light: "#F5F7FB",
          dark: "#0B0F1A"
        }
      }
    },
  },
  plugins: [],
};
