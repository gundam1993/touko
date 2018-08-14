import * as Koa from "koa"
import config from "./middlewares/config"
import router from "./router"
import * as bodyParser from "koa-bodyparser"
import * as logger from "koa-logger"
// import sequlize from './middlewares/sequelize'
// import graphql from './middlewares/graphqlLoader'
import { createConnection } from "typeorm";
import { Post } from "./entities/post";
import { User } from "./entities/user";
import { Introduction } from "./entities/introduction";
import errorHandler from "./middlewares/errorHandler"
const { Nuxt, Builder } = require('nuxt-edge')
// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

export default class ModifiedKoa extends Koa implements ModifiedKoa  {
  readonly BaseDir: string
  readonly isProduction: boolean
  // Sequelize: Sequelize.SequelizeStatic
  // model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  // db: sqlite3.Database
  // schema: GraphQLSchema
  config: any

  constructor(BaseDir: string, NODE_ENV:string | undefined) {
    console.log(`Running on ${NODE_ENV || 'development'} mode`)
    super()
    this.BaseDir = BaseDir
    this.isProduction = (NODE_ENV === 'production')
    // load config
    config(this, this.BaseDir)
    process.env.BASE_URL = this.config.baseUrl
    // set cookie key
    this.keys = this.config.cookieKey
    // logger
    this.use(logger())
    // error handler
    this.use(errorHandler())
    // bodyparser
    this.use(bodyParser())
    // connect database
    // sequlize(this, this.config.db)
    // connect graphql
    // graphql(this)
  }

  async runProduction():Promise<any> {
    const nuxt = new Nuxt(nuxtConfig)
    // add router middleware:
    this.use(router().routes())
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

  async runDev():Promise<any> {
    const nuxt = new Nuxt(nuxtConfig)
    // Build in development
    const builder = new Builder(nuxt)
    await builder.build()
    this.use(router().routes())
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

  async start():Promise<void> {
    try {
      await createConnection({
        entities: [
          Post,
          User,
          Introduction
        ],
        ...this.config.db
      })
      await this.listen(this.config.port)
      console.log(`app listening on port ${this.config.port}!`)
    } catch (e) {
      console.log(e)
    }
  }
}
