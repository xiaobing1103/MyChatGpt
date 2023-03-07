// vue.config.js
let path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  baseUrl : process.env.NODE_ENV === 'production' ? '/MyChatGpt/' : '/',
  outputDir: 'dist',
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          primary: '#fff',
        },
      },
    },
  },
}
