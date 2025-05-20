/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F0ED",
          100: "#CCE1DB",
          200: "#99C3B7",
          300: "#66A593",
          400: "#33876F",
          500: "#164C3E", // Base color
          600: "#123D32",
          700: "#0D2E25",
          800: "#091E19",
          900: "#040F0C",
        },
        secondary: "#151312",
        light: {
          100: "#F5F9F8",
          200: "#E6F0ED",
          300: "#D6E7E2",
        },
        dark: {
          100: "#0D2E25",
          200: "#091E19",
          300: "#040F0C",
        },
        accent: "#66A593",
      },
    },
  },
  plugins: [],
};
