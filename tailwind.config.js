module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'border-beam': 'border-beam 4s ease infinite',
      },
      keyframes: {
        'border-beam': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}