/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': 'hsl(112, 94%, 94%)',
        'background': 'hsl(0, 0%, 0%)',
        'primary': 'hsl(141, 95%, 25%)',
        'secondary': 'hsl(171, 96%, 10%)',
        'accent': 'hsl(171, 96%, 50%)',
       },
       gridTemplateColumns:{
        fluid:"repeat(auto-fit,minmax(20rem,1fr))"
       },
       flex:{
        fluid:"max(calc((100% - 3rem) / 2),24rem)"
       }
    },
  },
  plugins: [require("daisyui")],
}