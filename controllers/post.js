const config = require('config-lite')
const Post = require('../models/post')

exports.getPosts = async (ctx, next) => {
  console.log(ctx.userInfo)
  const pageSize = ctx.query.pageSize
  const page = ctx.query.page
  const userId = ctx.userInfo.userId
  let posts = await Post.findAll({ where: {userId: userId}})
  const total = posts.length
  const tableInfo = posts.slice(pageSize * (page - 1), pageSize* page)
  ctx.response.body = {success: 1, total: total, posts: tableInfo}
}