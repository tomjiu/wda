const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://cba.itlike.com',
        changeOrigin: true
      }
    }
  }
})
