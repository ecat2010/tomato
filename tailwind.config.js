/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Aptos"', '"Segoe UI Variable Display"', '"Segoe UI"', 'sans-serif'],
        display: ['"Georgia"', '"Times New Roman"', 'serif'],
        mono: ['"Bahnschrift"', '"SFMono-Regular"', 'monospace'],
      },
      colors: {
        shell: {
          50: '#f9f5f5',
          100: '#efe5e6',
          200: '#dcc7c9',
          300: '#c6a4a8',
          400: '#ad7e83',
          500: '#955f65',
          600: '#7e4b53',
          700: '#643c43',
          800: '#43262f',
          900: '#221519',
        },
        ember: {
          300: '#f9b6a0',
          400: '#ef866c',
          500: '#e4604c',
          600: '#cb4332',
        },
      },
      boxShadow: {
        float: '0 30px 80px rgba(10, 10, 14, 0.28)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(226, 96, 76, 0.18)',
      },
      animation: {
        'slow-spin': 'slow-spin 18s linear infinite',
        'pulse-soft': 'pulse-soft 1.8s ease-out',
        shimmer: 'shimmer 12s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'slow-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%': { transform: 'scale(0.98)', opacity: '0.65' },
          '45%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translate3d(-4%, -2%, 0) scale(1)' },
          '100%': { transform: 'translate3d(4%, 2%, 0) scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
