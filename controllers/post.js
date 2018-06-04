const marked = require('./helper').marked

// 获取所有文章，需登录
exports.getAllPosts = async ({request, response, model, userInfo, app}, next) => {
  const userId = userInfo.userId
  const Op = app.Sequelize.Op
  let {search} = request.query
  search = search || ''
  const posts = await model.Post.findAll({
    where: {
      userId: userId,
      title: {
        [Op.like]: `%${search}%`
      }
    },
    attributes: { exclude: ['updatedAt'] },
    order: [['created_at', 'DESC']]
  })
  response.body = {success: 1, posts: posts}
}

// 新建文章
exports.createPost = async ({request, response, model, userInfo}, next) => {
  const userId = userInfo.userId
  const { title, content, display } = request.body
  if (!title || !content) throw new Error('请完成文章后再发布')
  const newPost = await model.Post.create({
    title: title,
    content: content,
    display: display,
    userId: userId
  })
  response.body = {success: 1, msg: '发布成功', post: newPost}
}

// 删除文章
exports.deletePost = async ({response, userInfo, model, request}, next) => {
  const userId = userInfo.userId
  const {postId} = request.params
  await model.Post.destroy({ where: {userId: userId, id: postId} })
  response.body = {success: 1, msg: '删除成功'}
}

// 按id获取文章详细信息
exports.getPostById = async ({response, userInfo, model, request}, next) => {
  const {postId} = request.params
  const post = await model.Post.findOne({
    where: {id: postId},
    attributes: {exclude: ['updatedAt']}
  })
  await post.update({pv: post.pv + 1})
  const html = marked(post.content)
  response.body = {
    success: 1,
    msg: '查询成功',
    post: {
      html: html,
      content: post.content,
      id: post.id,
      title: post.title,
      createdAt: post.created_at
    }
  }
}

// 修改文章
exports.editPost = async ({response, userInfo, model, request}, next) => {
  const userId = userInfo.userId
  const {postId} = request.params
  const {title, content, display} = request.body
  if (!title || !content) throw new Error('请完成文章后再发布')
  await model.Post.update(
    {title: title, content: content, display: display},
    { where: {userId: userId, id: postId},
      fields: ['title', 'content', 'display']})
  response.body = {success: 1, msg: '编辑成功'}
}

// 将已发布的文章移到草稿箱
exports.moveToDraft = async ({response, userInfo, model, request}, next) => {
  const userId = userInfo.userId
  const {postId} = request.params
  await model.Post.update({display: false}, {where: {userId: userId, id: postId}})
  response.body = {success: 1, msg: '移动成功'}
}

// 从草稿箱发布文章
exports.publishPost = async ({response, userInfo, model, request}, next) => {
  const userId = userInfo.userId
  const {postId} = request.params
  await model.Post.update(
    { display: true },
    {where: { userId: userId, id: postId }})
  response.body = {success: 1, msg: '发布成功'}
}

