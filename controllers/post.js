const config = require('config-lite')
const Post = require('../models/post')
const qiniu = require('qiniu')
const axios = require('axios')

// 按条件获取文章列表，需登录
exports.getPosts = async (ctx, next) => {
  let pageSize = ctx.query.pageSize
  if (pageSize ==='All') pageSize = 999999
  const page = parseInt(ctx.query.page)
  const search = ctx.query.search || ''
  const userId = ctx.userInfo.userId
  let posts
  let total
  if (search === '') {
    [total, posts] =  await Promise.all([
      Post.count({where: {userId: userId}}),
      Post.findAll({ where: {userId: userId},
                     attributes: {exclude: ['content', 'updatedAt'] },
                     order: [['id', 'DESC']],
                     limit: pageSize,
                     offset: pageSize * page})
    ])
  } else {
    [total, posts] =  await Promise.all([
      Post.count({where: {userId: userId, title:{$like: `%${search}%`}}}),
      Post.findAll({ where: {userId: userId, title:{$like: `%${search}%`}},
                     attributes: {exclude: ['content', 'updatedAt'] },
                     order: [['id', 'DESC']],
                     limit: pageSize,
                     offset: pageSize * page})
    ])
  }
  ctx.response.body = {success: 1, total: total, posts: posts}
}

// 生成上传图片用token
exports.getQiNiuToken = async (ctx, next) => {
  let data = ctx.request.body
  qiniu.conf.ACCESS_KEY = config.qiniu.AccessKey
  qiniu.conf.SECRET_KEY = config.qiniu.SecretKey
  //要上传的空间
  bucket = config.qiniu.bucket
  //生成上传 Token
  let putPolicy = new qiniu.rs.PutPolicy(bucket)
  const token = putPolicy.token()
  ctx.response.body = {success: 1, token: token}
}
// 新建文章
exports.createPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const post = ctx.request.body
  if (post.title && post.content) {
    let newPost = await Post.create({
      title: post.title,
      content: post.content,
      userId: userId
    })
    ctx.response.body = {success: 1, msg: '发布成功'}
  } else {
    ctx.response.body = {success: 0, msg: '请完成文章后再发布'}
  }
}
// 删除文章
exports.deletePost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  let res = await Post.destroy({ where: {userId: userId, id: postId}})
  ctx.response.body = {success: 1, msg: '删除成功'}
}
// 按id获取文章详细信息
exports.getPostById = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  let post = await Post.findOne({ where: {userId: userId, id: postId},
                                  attributes: {exclude: ['createdAt', 'updatedAt'] }})
  ctx.response.body = {success: 1, post: post, msg: '查询成功'}
}
// 修改文章
exports.editPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  const post = ctx.request.body
  if (post.title === '') {
    ctx.response.body = {success: 0, msg: '请完成文章后再发布'}
  } else {
    let  newPost = await Post.update({ title: post.title, content: post.content},
                                     { where: {userId: userId, id: postId},
                                       fields: ['title', 'content']})
    ctx.response.body = {success: 1, msg: '编辑成功'}
  }
}

