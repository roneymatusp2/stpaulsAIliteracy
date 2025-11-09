/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sps-ruby': '#820021',
        'sps-indigo': '#001D31',
        'sps-green': '#002718'
      },
      fontFamily: {
        heading: ['"Archer"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Century Gothic"', '"Nunito Sans"', '"Inter"', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards'
      }
    }
  },
  plugins: []
};
