module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'cyber-pink': '#ec4899',
        'cyber-fuchsia': '#d946ef',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'tech': ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

