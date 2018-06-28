const webpackConfig = require('../webpack/webpack.config.dev')
const historyApiFallback = require('koa2-connect-history-api-fallback')
const koaWebpack = require('koa-webpack')

module.exports = async function (app) {
  // handle fallback for HTML5 history API
  app.use(historyApiFallback())
  console.log(webpackConfig.output.publicPath)
  koaWebpack({
    config: webpackConfig,
    devMiddleware: {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    },
    hotClient: {
      logLevel: 'info'
      // log: false,
      // publicPath: webpackConfig.output.publicPath,
      // heartbeat: 2000
    }
  })
    .then((middleware) => {
      app.use(middleware)
    })
}
