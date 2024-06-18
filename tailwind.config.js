/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'custom-64': '16rem', // custom height 64
        'custom-96': '24rem', // custom height 96
        'custom-128': '40rem', // custom height 128
      },
    },
  },
  plugins: [],
};
