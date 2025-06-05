/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header_bg: "#131921",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // now Tailwind understands font-inter
      },
      backgroundImage: {
        fadeOut:
          "linear-gradient(180deg, transparent, rgb(37, 37, 37, 0.91),#f0e7f089)",
      },
    },
  },
  plugins: [],
};
