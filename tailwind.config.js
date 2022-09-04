const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      spacing: {
        '36': '9rem',
        '60': '15rem',
        '7': '1.75rem',
        '9': '4.5rem'
      },
      colors: {
        gray: {
          ...colors.gray,
          darker: '#404040',
          default: '#7F7F7F',
          lighter: '#F5F6F7',
          light: '#FAFAFA'
        }
      }
    },
  },
  variants: {},
  corePlugins: {
    container: false,
  },
  plugins: [

  ],
}
