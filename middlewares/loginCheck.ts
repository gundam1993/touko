import * as jwt from 'jsonwebtoken'
import * as ModifiedKoa from '../server'
import * as Koa from 'koa'

const loginCheck:Koa.Middleware = async(ctx:ModifiedKoa.ModifiedContext, next) => {
  let token:string = ctx.cookies.get('touko-blog-token') || ctx.request.headers['x-token']
  console.log(token)
  try {
    let user = jwt.verify(token, ctx.app.config.jwt.key)
    ctx.userInfo = user
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 200
    ctx.response.body = {success: 0, msg: err}
  }
}

export default loginCheck
