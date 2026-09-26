/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#060B18',
          850: '#0B1329',
          800: '#0F1A36',
          700: '#1E293B',
          600: '#334155',
        },
        hud: {
          cyan: '#06B6D4',
          blue: '#0EA5E9',
          glow: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          crimson: '#EF4444',
          violet: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2), inset 0 0 5px rgba(6, 182, 212, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(6, 182, 212, 0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
