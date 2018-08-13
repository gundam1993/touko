/**
 * Created by Tommy Huang on 18/04/24.
 */
import * as Koa from 'koa'
import { ModifiedKoa } from '../types/app';

const errorHandler:Koa.Middleware = async (ctx: Koa.Context, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    ctx.response.status = err.status || err.status || 200
    ctx.response.body = {
      success: 0,
      msg: err.message
    }
    ctx.app.emit('error', err, ctx)
  }
}

module.exports = (app:ModifiedKoa):Koa.Middleware => {
  app.on('error', function (err:Error) {
    // ctx.log.error(`[ERROR]: ${err.message}`)
    // ctx.log.error(`err`)
    console.error(`[ERROR]: ${err.stack}`)
  })
  return errorHandler
}
