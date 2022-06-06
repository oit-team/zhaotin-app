module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@oit/eslint-config/rules/vue',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    // 尾随逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 函数圆括号之前的空格
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
}
