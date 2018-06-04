exports.getPostsList = async ({model, response}, next) => {
  const posts = await model.Post.findAll({
    where: {display: true},
    attributes: { exclude: ['content', 'updatedAt'] },
    order: [['created_at', 'DESC']]
  })
  response.body = { success: 1, posts: posts }
}
