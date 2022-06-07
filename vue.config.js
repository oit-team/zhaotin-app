const { defineConfig } = require('@vue/cli-service')
const modifyVars = require('./vant.config')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    port: process.env.PORT || 5000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars,
      },
    },
  },
})
