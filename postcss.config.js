module.exports = {
  plugins: {
    // https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 6,
    },
  },
}
