const theme = require('./src/theme')
const baseConfig = require('./windi.config.base')

const spacing = (() => {
  const spacers = {}
  const spacer = 4
  for (let i = 0, l = 20; i <= l; i++) {
    spacers[i] = `${i * spacer}px`
  }
  return spacers
})()

module.exports = {
  presets: [
    baseConfig,
  ],
  extract: {
    include: [
      'src/**/*.{vue,js,scss}',
    ],
  },
  theme: {
    extend: {
      colors: theme.colors,
      spacing: {
        ...spacing,
        'status-bar': 'var(--status-bar-height)',
        auto: 'auto',
      },
      borderRadius: {
        circle: '50%',
      },
    },
  },
  plugins: [
    require('windicss-plugin-aspect-ratio'),
    require('windicss/plugin/line-clamp'),
  ],
}
