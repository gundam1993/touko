const config = require('config-lite')
const Post = require('../models/post')
const axios = require('axios')

exports.getAllPosts = async (ctx, next) => {
  try {
    let posts = await Post.findAll({where: {display: true},
                                    attributes: {exclude: ['content', 'updatedAt'] },
                                    order: [['createdAt', 'DESC']]}) 
    ctx.response.body = { success:1, posts: posts }
  } catch (e) {
    console.log(e)
    ctx.response.body = { success:0, msg: e}
  }
}