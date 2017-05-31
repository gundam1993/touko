const config = require('config-lite')
const Post = require('../models/post')
const axios = require('axios')

exports.getPosts = async (ctx, next) => {
  try {
    let start = ctx.query.start
    let end = ctx.query.end
    const limit = end - start
    let posts = await Post.findAll({where: {display: true},
                                    attributes: {exclude: ['createdAt'] },
                                    order: [['createdAt', 'DESC']],
                                    limit: limit,
                                    offset: start}) 
    ctx.response.body = { success:1, posts: posts }
  } catch (e) {
    console.log(e)
    ctx.response.body = { success:0, msg: e}
  }
}