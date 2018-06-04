const config = require('config-lite')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (ctx, next) => {
  let username = ctx.request.body && ctx.request.body.username
  let user = await ctx.model.User.findOne({ where: {username: username} })
  if (user === null) throw new Error('用户不存在')
  const passwordCheck = bcrypt.compareSync(ctx.request.body.password, user.password)
  if (!passwordCheck) throw new Error('密码错误')
  const expires = Date.now() + (60 * 60 * 1000 * config.cookieExpires)
  const token = jwt.sign({
    iss: 'touko',
    userId: user.id,
    exp: expires
  }, config.jwt.key)
  ctx.cookies.set('touko-blog-token', token, {expires: new Date(expires), signed: true, httpOnly: false})
  ctx.response.body = {
    success: 1,
    desc: 'success',
    token: token
  }
}

exports.logout = async (ctx, next) => {
  ctx.cookies.set('touko-blog-token', null)
  ctx.response.body = {success: 1}
}
