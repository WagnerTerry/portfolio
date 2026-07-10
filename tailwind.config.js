/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'game-dark': '#1a1c2c',
        'game-purple': '#5d275d',
        'game-purple-light': '#7a3a7a',
        'game-red': '#d83a3a',
        'game-yellow': '#ffd54f',
        'game-cyan': '#9adcf8',
        'game-blue': '#2b4fa3',
        'game-brown': '#6d4c2f',
        'brand-blue': '#0d95f8',
        'brand-blue-dark': '#1c8af8',
        'neon-cyan': '#00f5ff',
        'neon-magenta': '#ff2fd6',
        'neon-green': '#39ff88',
        'neon-yellow': '#ffe74c',
        'hud-bg': '#070a14',
        'hud-panel': '#0d1226',
        'hud-line': '#1c2440',
      },
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
        'press-start': ['"Press Start 2P"', 'monospace'],
        vt323: ['VT323', 'monospace'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      animation: {
        'game-pulse': 'game-button-pulse 2s ease-in-out infinite',
        'game-blink': 'game-blink 1s steps(1) infinite',
        'game-cursor': 'game-blink 0.6s steps(1) infinite',
        'neon-float': 'neon-float 4s ease-in-out infinite',
      },
      keyframes: {
        'game-button-pulse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'game-blink': {
          '50%': { opacity: '0' },
        },
        'neon-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant, addUtilities }) {
      addVariant('touch', '@media (pointer: coarse)');
      addUtilities({
        '.font-inherit': { 'font-family': 'inherit' },
      });
    },
  ],
}
