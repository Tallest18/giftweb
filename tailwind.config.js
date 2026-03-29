/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: { 50: '#FDFAF6', 100: '#FAF4EC', 200: '#F5E8D4', 300: '#EDD4B3' },
        gold: { light: '#F5D78E', mid: '#D4A843', dark: '#9A7320' },
        charcoal: { light: '#5C5C6B', mid: '#3A3A4A', dark: '#1C1C2E' }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(196,104,122,0.15)',
        'card': '0 2px 20px rgba(28,28,46,0.08)',
        'card-hover': '0 8px 40px rgba(28,28,46,0.18)',
      }
    },
  },
  plugins: [],
}
