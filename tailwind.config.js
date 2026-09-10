/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14201B",
        pine: "#1F3A2E",
        pineLight: "#2C4E3D",
        brass: "#C08A34",
        brassLight: "#DBAE63",
        stone: "#F1ECE1",
        cloud: "#FBF9F4",
        slate: "#5B6760",
        clay: "#7A3B2E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};
