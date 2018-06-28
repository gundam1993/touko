import * as Koa from "koa"
import * as path from "path"
const config = require('./middlewares/config')
const router = require('./router')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const staticMiddleware = require('./middlewares/static')
const sequlize = require('./middlewares/sequelize')
const errorHandler = require('./middlewares/errorHandler')
const { Nuxt, Builder } = require('nuxt-edge')
// Import and Set Nuxt.js options
let nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')
const args:Array<String> = process.argv.splice(2)



async function start () {
  console.log(`Running on ${process.env.NODE_ENV || 'development'} mode`)
  let app = new Koa()
  app.BaseDir = __dirname
  app.isProduction = (process.env.NODE_ENV === 'production')
  process.env.BASE_URL = config.baseUrl
  // load config
  config(app, app.BaseDir)
  // set cookie key
  app.keys = app.config.cookieKey
  // logger
  app.use(logger())
  // error handler
  app.use(errorHandler(app))
  // bodyparser
  app.use(koaBody({ multipart: true }))
  // connect database
  sequlize(app, app.config.db)
  const ADMIN_DIST_DIR = path.join(__dirname, app.config.AdminDir.dist)
  const STATIC_DIR = path.join(__dirname, app.config.AdminDir.static)
  app.use(staticMiddleware({
    dir: [ADMIN_DIST_DIR, STATIC_DIR],
    prefix: '/admin'
  }, app))
  const nuxt = new Nuxt(nuxtConfig)
  const targetIndex = args.indexOf('--target')
  const target = args[targetIndex + 1] || ''
  if (target === 'admin' && !app.isProduction) {
    console.log('Dev Admin')
    // 开发模式下使用 koa-webpack 热更新页面
    app.use(router.routes())
    const webpackMiddleware = require('./middlewares/webpackMiddleware')
    webpackMiddleware(app)
  } else if (!app.isProduction) {
    // Build in development
    const builder = new Builder(nuxt)
    await builder.build()
    app.use(router.routes())
  } else {
    // add router middleware:
    app.use(router.routes())
    app.use(async (ctx: Koa.Context, next) => {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })
  }
  app.listen(app.config.port, () => console.log(`app listening on port ${app.config.port}!`))
}

module.exports = start
