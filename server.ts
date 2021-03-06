import * as Koa from "koa"
import * as path from "path"
import * as Sequelize from 'sequelize'
const config = require('./middlewares/config')
import router from './router'
const koaBody = require('koa-body')
const logger = require('koa-logger')
const staticMiddleware = require('./middlewares/static')
import sequlize from './middlewares/sequelize'
import { ModifiedModel } from "./typings/app/models";
import graphql from './middlewares/graphqlLoader'
import * as sqlite3 from 'sqlite3'
import { GraphQLSchema } from "./node_modules/@types/graphql";
const errorHandler = require('./middlewares/errorHandler')
const { Nuxt, Builder } = require('nuxt-edge')
// Import and Set Nuxt.js options
let nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')


export default class ModifiedKoa extends Koa implements ModifiedKoa  {
  readonly BaseDir: string
  readonly isProduction: boolean
  Sequelize: Sequelize.SequelizeStatic
  model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  db: sqlite3.Database
  schema: GraphQLSchema
  config: any

  constructor(BaseDir: string, NODE_ENV:string) {
    console.log(`Running on ${NODE_ENV || 'development'} mode`)
    super()
    this.BaseDir = BaseDir
    this.isProduction = (NODE_ENV === 'production')
    process.env.BASE_URL = config.baseUrl
    // load config
    config(this, this.BaseDir)
    // set cookie key
    this.keys = this.config.cookieKey
    // logger
    this.use(logger())
    // error handler
    this.use(errorHandler(this))
    // bodyparser
    this.use(koaBody({ multipart: true }))
    // connect database
    sequlize(this, this.config.db)
    // connect graphql
    graphql(this)
    const ADMIN_DIST_DIR:string = path.join(__dirname, this.config.AdminDir.dist)
    const STATIC_DIR:string = path.join(__dirname, this.config.AdminDir.static)
    this.use(staticMiddleware({
      dir: [ADMIN_DIST_DIR, STATIC_DIR],
      prefix: '/admin'
    }, this))
  }

  async runProduction():Promise<any> {
    const nuxt = new Nuxt(nuxtConfig)
    // add router middleware:
    this.use(router(this).routes())
    this.use(async (ctx: Koa.Context, next) => {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, (promise:Promise<any>) => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })
  }

  runDevAdmin():void {
    console.log('Dev Admin')
    // 开发模式下使用 koa-webpack 热更新页面
    this.use(router(this).routes())
    const webpackMiddleware = require('./middlewares/webpackMiddleware')
    webpackMiddleware(this)
  }

  async runDev():Promise<any> {
    const nuxt = new Nuxt(nuxtConfig)
    // Build in development
    const builder = new Builder(nuxt)
    await builder.build()
    this.use(router(this).routes())
    this.use(async (ctx: Koa.Context, next) => {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, (promise: any) => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })
  }

  start():void {
    this.listen(this.config.port, () => console.log(`app listening on port ${this.config.port}!`))
  }
}
