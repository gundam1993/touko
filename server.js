const Koa = require('koa')
const serverConfig = require('config-lite')
const router = require('./router')
const koaBody = require('koa-body')
const Nuxt = require('nuxt').Nuxt
const NuxtBuilder = require('nuxt').Builder

async function start () {
  const app = new Koa()
  const host = serverConfig.host || '127.0.0.1'
  const port = serverConfig.port || 3000

  app.keys = ['the suicidal mime']
  process.env.BASE_URL = serverConfig.baseUrl
  // connect database
  require('./models/database')
  // Import and Set Nuxt.js options
  let config = require('./nuxt.config.js')
  config.dev = !(app.env === 'production')
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  // Build in development
  if (config.dev) {
    const builder = new NuxtBuilder(nuxt)
    await builder.build()
  }
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
  })

  // bodyparser
  app.use(koaBody({multipart: true}))
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

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

module.exports = start
