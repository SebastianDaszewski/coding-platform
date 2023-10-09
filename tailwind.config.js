/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121415",
        darkGrey: "#222426",
        orange: "#F5A22E",
        red: "#F74746",
        lightBlue: "#97E7E7",
        blue: "#0074F0",
        white: "#ffffff",
      },
      iconProperties: {
        iconSize: 20,
      },
      minHeight: {
        200: "50rem",
        "90vh": "90vh",
      },
      maxHeight: {
        "100vh": "100vh",
      },
      screens: {
        256: "64rem",
        341.5: "85.375rem",
        tall: { raw: "(min-height: 1615px)" },
        middle: { raw: "(max-height: 1614px)" },
        short: { raw: "(min-height: 1000px)" },
        shortMax: { raw: "(max-height: 900px)" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlack: "#222426",
        customRed: "F74746",
      },

      fontSize: {
        5.5: "1.375rem",
        6.5: "1.625rem",
        8: "2rem",
        12: "3.125rem",
        16: "4rem",
      },
      lineHeight: {
        3.5: "0.875rem",
        4.375: "1.09375rem",
        4.5: "1.125rem",
        5.25: "1.3125rem",
        6.75: "1.6875rem",
        7.5: "1.875rem",
        11: "2.75rem",
        15: "3.75rem",
      },
      boxShadow: {
        custom: "0 0 10px 0 rgba(0, 0, 0, 0.6)",
      },
      backgroundColor: {
        customGray: "#222426",
        customBlue: "#0074F0",
      },
      spacing: {
        15: "15px",
        35: "35px",
        75: "75px",
        100: "100px",
      },
      width: {
        37.5: "9.375rem",
        50: "12.5rem",
        76.25: "19.0625rem",
        100: "25rem",
        112: "28rem",
        130: "32.5rem",
        159: "39.75rem",
        175: "43.75rem",
        192: "48rem",
        197.5: "49.375rem",
        256: "64rem",
        341.5: "85.375rem",
      },
      height: {
        10.5: "2.625rem",
        49.5: "12.375rem",
        50: "12.5rem",
        69.5: "17.375rem",
        100: "25rem",
        120: "30rem",
        141: "35.25rem",
        150: "37.5rem",
        163.5: "40.875rem",
        175: "43.75rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
