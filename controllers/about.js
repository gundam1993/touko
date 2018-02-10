const Introduction = require('../models/introduction')
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

exports.getAboutInfo = async (ctx, next) => {
  try {
    let about = await Introduction.findOne({attributes: ['content']})
    if (about) {
      ctx.response.body = { success: 1, content: about.content, html: marked(about.content) }
    } else {
      ctx.response.body = { success: 1, content: '', html: '' }
    }
  } catch (e) {
    ctx.response.body = { success: 1, msg: `获取失败:${e.message}` }
  }
}

exports.updateAboutInfo = async (ctx, next) => {
  try {
    let userId = ctx.userInfo.userId
    let content = ctx.request.body.content
    let about = await Introduction.findOne({ where: { userId: userId } })
    let info
    if (about) {
      info = await Introduction.update({ content: content },
        { where: { userId: userId } })
    } else {
      info = Introduction.create({content: content, userId: userId})
    }
    if (!info) {
      throw new Error()
    }
    ctx.response.body = { success: 1, msg: '更新成功' }
  } catch (e) {
    ctx.response.body = { success: 1, msg: `更新失败:${e.message}` }
  }
}
