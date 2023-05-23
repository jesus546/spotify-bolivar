/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      screens: {
        "2xl": { max: "3535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1920px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1024px" },//1440
        // => @media (max-width: 1023px) { ... }

        md: { max: "768px" }, //1024
        // => @media (max-width: 767px) { ... }

        sm: { max: "425px" }, //768
        // => @media (max-width: 639px) { ... }
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
      },
      animation: {
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    fontFamily: {
      body: ["Poppins", "serif"],
      sans: ["ui-sans-serif", "system-ui"],
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ],
}
