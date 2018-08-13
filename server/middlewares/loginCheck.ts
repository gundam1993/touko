import * as jwt from 'jsonwebtoken'
import * as Koa from 'koa'
import { ModifiedContext, UserInfo } from '../../types/app';

const loginCheck:Koa.Middleware = async(ctx:ModifiedContext, next) => {
  let token:string = ctx.cookies.get('touko-blog-token') || ctx.request.headers['x-token']
  try {
    let user = <UserInfo>jwt.verify(token, ctx.app.config.jwt.key)
    ctx.userInfo = user
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 200
    ctx.response.body = {success: 0, msg: err}
  }
}

export default loginCheck
