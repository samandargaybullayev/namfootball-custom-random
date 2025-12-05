/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#2A0A48',
        'purple-glow': '#6B2C91',
        'neon-purple': '#A855F7',
        'neon-cyan': '#00F5FF',
        'gold': '#FFD700',
        'gold-glow': '#FFA500',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168, 85, 247, 0.5)',
        'gold-glow': '0 0 30px rgba(255, 215, 0, 0.8)',
        'neon': '0 0 10px rgba(0, 245, 255, 0.8)',
      },
    },
  },
  plugins: [],
}


