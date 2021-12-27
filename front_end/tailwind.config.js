const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        orange: colors.orange,
        lime: colors.lime,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // styled: false,
    themes: false,
  },
};
