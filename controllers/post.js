const config = require('config-lite')
var Post = require('../models/post')

exports.getPosts = async (ctx, next) => {
  const pageSize = ctx.query.pageSize
  ctx.status = 200
}