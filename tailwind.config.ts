import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pokemon-red': '#EE1515',
        'pokemon-blue': '#1E90FF',
        'pokemon-yellow': '#FFDE00',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        pokemon: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      },
    },
  },
  plugins: [],
};

export default config;
