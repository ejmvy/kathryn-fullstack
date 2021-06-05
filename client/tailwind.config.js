module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "system-ui"],
      },
      colors: {
        green: {
          light: "#627F8A",
          dark: "#365a69",
          med: "#50ccc7",
          white: "#D0E8E2",
        },
        pink: {
          light: "#FFA89F",
          dark: "#A15C65",
        },
        gray: {
          light: "#C4C3C5",
          dark: "#838383",
        },
        black: {
          dark: "#141414",
        },
      },
      inset: {
        "1/20": "5%",
      },
      fontSize: {
        xxs: ".65rem",
        xs: ".75rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
