/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeUp: "fadeUp 0.5s cubic-bezier(.33,.88,.8,1.4)",
        grow: "grow 0.125s cubic-bezier(.33,.88,.8,1.4) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            transform: "scale(0.1, 0.1) translateY(50px)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1, 1) translateY(0px)",
            opacity: 1,
          },
        },
        grow: {
          "0%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1.05, 1.05)" },
        },
      },
    },
  },
  plugins: [],
};
