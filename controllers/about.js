const marked = require('./helper').marked

exports.getAboutInfo = async ({response, model}, next) => {
  const about = await model.Introduction.findOne({attributes: ['content']})
  response.body = {
    success: 1,
    content: about.content || '',
    html: about ? marked(about.content) : ''
  }
}

exports.updateAboutInfo = async ({response, request, userInfo, model}, next) => {
  let userId = userInfo.userId
  const {content} = request.body
  const about = await model.Introduction.findOne({ where: { userId: userId } })
  let info = (about
    ? await model.Introduction.update({ content: content }, { where: { userId: userId } })
    : await model.Introduction.create({content: content, userId: userId}))
  response.body = { success: 1, msg: '更新成功' }
}
