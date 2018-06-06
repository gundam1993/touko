const jwt = require('jsonwebtoken')

var loginCheck = async(ctx, next) => {
  let token = ctx.cookies.get('touko-blog-token') || ctx.request.headers['x-token']
  console.log(token)
  try {
    let user = jwt.verify(token, ctx.app.config.jwt.key)
    ctx.userInfo = user
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 200
    ctx.response.body = {success: 0, msg: e}
  }
}

module.exports = loginCheck
