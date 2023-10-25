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
        bgColor: '#cae1e0',
        title: '#357578',
        bgTitle: '#43babc',
      },
      animation: {
        register: 'scale-110 transition-transform duration-500 ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
