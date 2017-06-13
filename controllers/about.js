const config = require('config-lite')
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
    console.log(about.content)
    if (about) {
      ctx.response.body = { success: 1, content: about.content, html: marked(about.content)}
    } else {
      ctx.response.body = { success: 1, content: '', html: marked(about.content) }
    }
  } catch(e) {
    ctx.response.body = {success: 0, msg: e}
  }
 }

exports.updateAboutInfo = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const content = ctx.request.body.content
  let about = await Introduction.findOne({ where: { userId: userId }})
  console.log(about)
  if (about) {
    await Introduction.update({ content: content },
                     { where:{userId: userId }})
    ctx.response.body = { success: 1, msg: '更新成功' }
  } else {
    let info = Introduction.create({content: content, userId: userId})
    ctx.response.body = { success: 1, msg: '更新成功' }
  }
}