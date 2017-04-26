const jwt = require('jsonwebtoken')
const config = require('config-lite')

var loginCheck = async(ctx, next) => {
  let token = ctx.headers['x-access-token']
  try {
    let user = jwt.verify(token, config.jwt_key)
    ctx.userInfo = user
     await next()
  }
  catch (e) {
    console.log(e)
    ctx.status = 200
    ctx.response.body = {success: 0, msg:e}
  }
}

module.exports = loginCheck