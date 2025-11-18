/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        // paleta primária (roxo azulado)
        primary: {
          50: "#f2eaff",
          100: "#e6d4ff",
          200: "#c5a8ff",
          300: "#a47cff",
          400: "#8250ff",
          500: "#6b3aff",  
          600: "#592ecc",
          700: "#472399",
          800: "#341766",
          900: "#220c33",
        },

        // azul suave (para detalhes)
        accent: {
          50: "#e8f1ff",
          100: "#d1e3ff",
          200: "#a3c5ff",
          300: "#75a8ff",
          400: "#478aff",
          500: "#1a6cff",  
          600: "#1556cc",
          700: "#104199",
          800: "#0a2b66",
          900: "#051633",
        },

        // 🌫️ Backgrounds
        background: {
          light: "#F6F7FB",
          dark: "#0A0B14",      
          card: "#11121C",
        },

        // superfícies (cards, inputs, botões)
        surface: {
          light: "#FFFFFF",
          dark: "#181A28",
          soft: "#1F2033",
        },

        // bordas
        borderc: {
          light: "#E3E5EC",
          dark: "#2A2D3F",
        },

        // gradientes
        gradient: {
          primary: "linear-gradient(135deg, #6b3aff 0%, #1a6cff 100%)",
          soft: "linear-gradient(135deg, #1A1D35 0%, #0A0B14 100%)",
        },
      },

      boxShadow: {
        soft: "0 4px 20px -4px rgba(0,0,0,0.25)",
        glow: "0 0 20px rgba(107,58,255,0.5)",
      },

      borderRadius: {
        xl2: "1.25rem",
        card: "18px",
      },
    },
  },

  plugins: [],
};
