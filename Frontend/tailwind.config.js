/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/*.js",],
  content: ["./src/**/*.{js,jsx,ts,tsx,jpg}",
  "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx,jpg}",
  ]
  ,

  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}

