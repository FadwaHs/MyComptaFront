/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'white':{
        1:"#ffffff",
        2: '#f4f4f4',
      },
      'black':{
        1: '#222223',
        2: '#3a3a3a'
      },
      'gray' :{
        1: '#f6f6f6',
        2: '#636363',
        3: '#dbdbdb',
        4: '#9ca3af',
        5: '#6b7280'
      },
      'red': '#f87171',
      'blue': '#60a5fa',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      popping: ['Poppins'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
        'md': '0.375rem',

      }
    },
    screens: {
      'sm': ' 660px',
      'sm-md':'840px',
      'md': '1024px',
      'md2' : "1150px",
      'md-lg': '1240px',
      'lg': '1280px',

      // 'sm': {'min': '640px', 'max': '767px'},
      // // => @media (min-width: 640px and max-width: 767px) { ... }

      // 'md': {'min': '768px', 'max': '1023px'},
      // // => @media (min-width: 768px and max-width: 1023px) { ... }

      // 'lg': {'min': '1024px', 'max': '1279px'},
      // // => @media (min-width: 1024px and max-width: 1279px) { ... }

      // 'xl': {'min': '1280px', 'max': '1535px'},
      // // => @media (min-width: 1280px and max-width: 1535px) { ... }

      // '2xl': {'min': '1536px'},
      // // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
