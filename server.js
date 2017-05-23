const Koa = require('koa')
const server_config = require('config-lite')
const router = require('./router')
const koaBody = require('koa-body')
const Nuxt = require('nuxt')
const nuxt_config = require('./nuxt.config.js')

const app = new Koa()

app.keys = ['the suicidal mime']

const isProduction = (app.env === 'production')

process.env.BASE_URL = server_config.baseUrl

// Init Nuxt.js
const nuxt = new Nuxt(nuxt_config)

//connect database
var sequlize = require('./models/database')

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
})
//bodyparser
app.use(koaBody({multipart: true}))
// add router middleware:
app.use(router.routes());
// Build only in dev mode
if (!isProduction) {
  nuxt.build()
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

app.use( async (ctx, next) => {
  ctx.status = 200
  await nuxt.render(ctx.req, ctx.res)
})

app.listen(server_config.port)
console.log(`app started at port ${server_config.port}...`)
