module.exports = {
  extract: {
    exclude: ['node_modules'],
  },
  darkMode: false,
  theme: {
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50, // 基准
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
      auto: 'auto',
    },
    extend: {
      borderRadius: {
        circle: '50%',
      },
    },
  },
}
