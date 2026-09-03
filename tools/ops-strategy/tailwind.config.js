/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f6efe0',
        'parchment-dark': '#ece0c4',
        ink: '#241f18',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'ui-serif', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 0 rgba(36, 31, 24, 0.9), 0 8px 20px -6px rgba(36, 31, 24, 0.25)',
      },
    },
  },
  plugins: [],
}
