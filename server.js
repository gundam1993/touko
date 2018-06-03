const Koa = require('koa')
const config = require('./middlewares/config')
const router = require('./router')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const sequlize = require('./middlewares/sequelize')
const errorHandler = require('./middlewares/errorHandler')
const { Nuxt, Builder } = require('nuxt')
// Import and Set Nuxt.js options
let nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

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
  app.use(koaBody({multipart: true}))
  // connect database
  sequlize(app, app.config.db)
  const nuxt = new Nuxt(nuxtConfig)
  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // add router middleware:
  app.use(router.routes())
  app.use(async (ctx, next) => {
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
  app.listen(app.config.port, () => console.log(`app listening on port ${app.config.port}!`))
}

module.exports = start
