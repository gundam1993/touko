const config = require('config-lite')
const bcrypt = require('bcrypt')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
var User = require('../models/user')

exports.createUser =  async (ctx, next) => {
  var now = Date.now()
  var password = await bcrypt.hash(md5('021911'), config.bcrypt.saltRounds)
  console.log(password)
  var admin = await User.create({
    id: 'd-' + now,
    username: 'gundam1993',
    password: password,
  })
  console.log('created: ' + JSON.stringify(admin));
  ctx.status = 200
}

exports.login = async (ctx, next) => {
  try {
    const username = ctx.request.body.username
    const user = await User.findOne({ where: {username: username}})
    const passwordCheck = await bcrypt.compare(ctx.request.body.password, user.password)
    if (passwordCheck) {
      var token = jwt.sign({
          iss: user.id,
          exp: 1000 * 60 * 60
        }, config.jwt.key)
      console.log(token)
      ctx.status = 200
      ctx.response.body = {
        success: 1,
        token: token
      }
    }else {
      ctx.status = 200
      ctx.response.body = {
        success: 0
      }
    }
  }
  catch (e) {
    console.log(e)
  }
  
}