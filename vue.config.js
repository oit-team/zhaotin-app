const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const rimraf = require('rimraf')
const modifyVars = require('./vant.config')

const pkg = require('./package')

// 输出目录，格式：项目名@环境
const outputDir = `${pkg.name}@${process.env.NODE_ENV}`

// 清理压缩包
rimraf(`${outputDir}.{zip,7z}`, () => {})

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir,
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
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
  },
})
