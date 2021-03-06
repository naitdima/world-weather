module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/world-weather/' : '/',
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
}
