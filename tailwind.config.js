/** @type {import('tailwindcss').Config} */

import twscroll from "tailwind-scrollbar"
export default {
  content: ["src/**/*.{svelte,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        "mono": ["monospace"],
        "serif": ["serif"],
        "sans": ["sans-serif"],
        "poppins": ["Poppins"]
      }
    },
  },
  plugins: [
    twscroll()
  ],
}

