/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#e50914",
          dark: "#141414",
          light: "#303030",
        },
      },
      backgroundImage: {
        'gradient-overlay': 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.6) 40%, rgba(20,20,20,0) 100%)',
      },
    },
  },
  plugins: [],
}
