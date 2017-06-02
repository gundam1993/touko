const config = require('config-lite')
const Introduction = require('../models/introduction')

exports.getAboutInfo = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  let about = await Introduction.findOne({ where: { userId: userId }})
  if (about.content) {
    ctx.response.body = { success: 1, content: about.content }
  } else {
    ctx.response.body = { success: 1, content: '' }
  }
}

exports.updateAboutInfo = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const content = ctx.request.body.content
  let about = await Introduction.findOne({ where: { userId: userId }})
  console.log(about)
  if (about) {
    await Introduction.update({ content: content },
                     { where:{userId: userId }})
    ctx.response.body = { success: 1, msg: '更新成功' }
  } else {
    let info = Introduction.create({content: content, userId: userId})
    ctx.response.body = { success: 1, msg: '更新成功' }
  }
}