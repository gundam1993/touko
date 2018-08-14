/**
 * Created by Tommy Huang on 18/04/24.
 */
import * as Koa from 'koa'


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
  }
}

export default ():Koa.Middleware => {
  return errorHandler
}
