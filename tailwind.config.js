/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@smartive-education/design-system-component-library-musketeers/preset')],
  content: [
    './node_modules/@smartive-education/design-system-component-library-musketeers/dist/components/**/*.js',
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
