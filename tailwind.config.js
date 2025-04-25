/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        heading: ["anisette-std", "sans-serif"],
      },
      fontSize: {
        '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // Custom 3xl size
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // Custom 4xl size
      },
      colors: {
        orange: "#FD8234",
        tan: "#F6EFE5",
        teal: "#01B2AA",
        grey: "#808080",
        black: "#323232",
        "true-black": "#000000",
        white: "#FFFFFF",
        "off-white": "#FFFCF8",
      },
    },
  },
  plugins: [],
};
