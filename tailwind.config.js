module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-img": "url('../public/images/main-background.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
