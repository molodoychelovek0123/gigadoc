/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      background: {
        black: '#000',
        'slate-950': '#09101d',
        'indigo-950': '#372579',
        'zinc-500': '#84878e',
        'zinc-200': '#f3f3f3',
        'zinc-100': '#f2f2f2',
      },
      fontFamily: {
        heading: ['Source Sans Pro', 'sans-serif'],
        default: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(({ addComponents, _ }) => {
      addComponents({
        '.a-centered': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.a-x-centered': {
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)',
        },
        '.a-y-centered': {
          position: 'absolute',
          top: '50%',
          transform: 'translate(0, -50%) !important',
        },
      });
    }),
  ],
};
export default config;
