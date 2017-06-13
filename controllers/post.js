const config = require('config-lite')
const Post = require('../models/post')
const axios = require('axios')
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
const Marked = require('marked')
const marked = Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ',
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

// 按条件获取文章列表，需登录
exports.getPosts = async (ctx, next) => {
  let display = !(ctx.query.display === 'false')
  let pageSize = ctx.query.pageSize
  if (pageSize ==='All') pageSize = 999999
  const page = parseInt(ctx.query.page)
  const search = ctx.query.search || ''
  const userId = ctx.userInfo.userId
  let posts
  let total
  if (search === '') {
    [total, posts] =  await Promise.all([
      Post.count({where: {userId: userId, display: display}}),
      Post.findAll({ where: {userId: userId, display: display},
                     attributes: {exclude: ['content', 'updatedAt'] },
                     order: [['id', 'DESC']],
                     limit: pageSize,
                     offset: pageSize * page})
    ])
  } else {
    [total, posts] =  await Promise.all([
      Post.count({where: {userId: userId, display: display, title:{$like: `%${search}%`}}}),
      Post.findAll({ where: {userId: userId, display: display, title:{$like: `%${search}%`}},
                     attributes: {exclude: ['content', 'updatedAt'] },
                     order: [['id', 'DESC']],
                     limit: pageSize,
                     offset: pageSize * page})
    ])
  }
  ctx.response.body = {success: 1, total: total, posts: posts}
}

// 新建文章
exports.createPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const post = ctx.request.body
  if (post.title && post.content) {
    let newPost = await Post.create({
      title: post.title,
      content: post.content,
      display: post.display,
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
  const postId = ctx.params.postId
  let post = await Post.findOne({ where: {id: postId},
                                  attributes: {exclude: ['updatedAt'] }})
  post.update({pv: post.pv + 1})
  let html = marked(post.content)
  ctx.response.body = {success: 1, msg: '查询成功', post: {
    html: html,
    content: post.content,
    id: post.id,
    title: post.title,
    createdAt: post.createdAt
  }}
}
// 修改文章
exports.editPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  const post = ctx.request.body
  if (post.title === '') {
    ctx.response.body = {success: 0, msg: '请完成文章后再发布'}
  } else {
    let  newPost = await Post.update({ title: post.title, content: post.content, display: post.display},
                                     { where: {userId: userId, id: postId},
                                       fields: ['title', 'content', 'display']})
    ctx.response.body = {success: 1, msg: '编辑成功'}
  }
}

// 将已发布的文章移到草稿箱
exports.moveToDraft = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  await Post.update({ display: false },
                    { where: { userId: userId, id: postId }})
  ctx.response.body = {success: 1, msg: '移动成功'}
}

// 从草稿箱发布文章
exports.publishPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  await Post.update({ display: true },
                    { where: { userId: userId, id: postId }})
  ctx.response.body = {success: 1, msg: '发布成功'}
}

