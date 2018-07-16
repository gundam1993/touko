import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as Koa from 'koa'
import * as md5 from 'md5'
import { ModifiedContext } from '../typings/app';

interface UserLoginSubmit {
  username: string
  password: string
}

export const login:Koa.Middleware = async (ctx:ModifiedContext) => {
  const {username, password}:UserLoginSubmit = ctx.request.body
  let user = await ctx.model.User.findOne({ where: {username: username} })
  if (user === null) throw new Error('用户不存在')
  const passwordCheck = bcrypt.compareSync(<string>md5(password), user.password)
  if (!passwordCheck) throw new Error('密码错误')
  const expires = Date.now() + (60 * 60 * 1000 * ctx.app.config.cookieExpires)
  const token = jwt.sign({
    iss: 'touko',
    userId: user.id,
    exp: expires
  }, ctx.app.config.jwt.key)
  ctx.cookies.set('touko-blog-token', token, {expires: new Date(expires), signed: true, httpOnly: false})
  ctx.response.body = {
    success: 1,
    desc: 'success',
    token: token
  }
}

export const logout:Koa.Middleware = async (ctx:ModifiedContext) => {
  ctx.cookies.set('touko-blog-token', null)
  ctx.response.body = {success: 1}
}
