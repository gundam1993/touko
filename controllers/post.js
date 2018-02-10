const Post = require('../models/post')
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

// 获取所有文章，需登录
exports.getAllPosts = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const search = ctx.query.search || ''
  let posts
  if (search === '') {
    posts = await Post.findAll({ where: {userId: userId},
      attributes: { exclude: ['updatedAt'] },
      order: [['id', 'DESC']] })
  } else {
    posts = await Post.findAll({ where: {userId: userId, title: {$like: `%${search}%`}},
      attributes: { exclude: ['updatedAt'] },
      order: [['id', 'DESC']]})
  }
  ctx.response.body = {success: 1, posts: posts}
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
    ctx.response.body = {success: 1, msg: '发布成功', post: newPost}
  } else {
    ctx.response.body = {success: 0, msg: '请完成文章后再发布'}
  }
}
// 删除文章
exports.deletePost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  await Post.destroy({ where: {userId: userId, id: postId} })
  ctx.response.body = {success: 1, msg: '删除成功'}
}
// 按id获取文章详细信息
exports.getPostById = async (ctx, next) => {
  const postId = ctx.params.postId
  let post = await Post.findOne({ where: {id: postId}, attributes: { exclude: ['updatedAt'] } })
  post.update({pv: post.pv + 1})
  let html = marked(post.content)
  ctx.response.body = {
    success: 1,
    msg: '查询成功',
    post: {
      html: html,
      content: post.content,
      id: post.id,
      title: post.title,
      createdAt: post.createdAt
    }
  }
}
// 修改文章
exports.editPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  const post = ctx.request.body
  if (post.title === '') {
    ctx.response.body = {success: 0, msg: '请完成文章后再发布'}
  } else {
    await Post.update(
      {title: post.title, content: post.content, display: post.display},
      { where: {userId: userId, id: postId},
        fields: ['title', 'content', 'display']})
    ctx.response.body = {success: 1, msg: '编辑成功'}
  }
}

// 将已发布的文章移到草稿箱
exports.moveToDraft = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  await Post.update({display: false}, {where: {userId: userId, id: postId}})
  ctx.response.body = {success: 1, msg: '移动成功'}
}

// 从草稿箱发布文章
exports.publishPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const postId = ctx.params.postId
  await Post.update({ display: true },
                    { where: { userId: userId, id: postId } })
  ctx.response.body = {success: 1, msg: '发布成功'}
}

