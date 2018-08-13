import * as Koa from "koa"
import * as Sequelize from 'sequelize'
const config = require('./middlewares/config')
import router from './router'
const koaBody = require('koa-body')
const logger = require('koa-logger')
// import sequlize from './middlewares/sequelize'
// import graphql from './middlewares/graphqlLoader'
import * as sqlite3 from 'sqlite3'
import { GraphQLSchema } from "../node_modules/@types/graphql";
import { createConnection } from "typeorm";
const errorHandler = require('./middlewares/errorHandler')
const { Nuxt, Builder } = require('nuxt-edge')
// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

export default class ModifiedKoa extends Koa implements ModifiedKoa  {
  readonly BaseDir: string
  readonly isProduction: boolean
  // Sequelize: Sequelize.SequelizeStatic
  // model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  db: sqlite3.Database
  schema: GraphQLSchema
  config: any

  constructor(BaseDir: string, NODE_ENV:string | undefined) {
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

  start():void {
    createConnection(this.config.db).then(() => {
      this.listen(this.config.port, () => console.log(`app listening on port ${this.config.port}!`))
    }).catch(err => console.log(err))
  }
}
