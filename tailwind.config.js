/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: theme => ({
        "screen/2-small": "30vh",
        "screen-half": "50vh",
        "screen/2": "65vh",
        "screen/9": "80vh",
        "screen/3": "73vh"
      }),
      width: theme => ({
        "screen/9": "95vw"
      }),
      text: theme => ({
        "text-8" : "5.5rem"
      }),
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'sky': '#8ecae6',
        'ocean': '#219ebc',
        'nevy': '#023047',
        'gold': '#ffb703',
        'carrot': '#fb8500',
      }
    },
  },
    plugins: [],
}
