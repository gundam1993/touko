const Koa = require('koa')
const server_config = require('config-lite')
const router = require('./router')
const koaBody = require('koa-body')
const Nuxt = require('nuxt')

const app = new Koa()

app.keys = ['the suicidal mime']

const isProduction = (app.env === 'production')
console.log(isProduction)
process.env.BASE_URL = server_config.baseUrl

// connect database
var sequlize = require('./models/database')

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
})
// bodyparser
app.use(koaBody({multipart: true}))
// add router middleware:
app.use(router.routes());

// Start nuxt.js
exports.start = async () => {
  // Import and Set Nuxt.js options
  const nuxt_config = require('./nuxt.config.js')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(nuxt_config)
  // Build in development
  if (!isProduction) {
    try {
      await nuxt.build()
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      process.exit(1)
    }
  }

  app.use(async (ctx, next) => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    await nuxt.render(ctx.req, ctx.res)
  })

  app.listen(server_config.port)
  console.log(`app started at port ${server_config.port}...`)
}
