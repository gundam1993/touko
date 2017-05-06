const config = require('config-lite')
const Post = require('../models/post')
const qiniu = require('qiniu')
const axios = require('axios')

//获取所有文章，续登录
exports.getPosts = async (ctx, next) => {
  console.log(ctx.userInfo)
  const pageSize = ctx.query.pageSize
  const page = ctx.query.page
  const userId = ctx.userInfo.userId
  let posts = await Post.findAll({ where: {userId: userId}})
  const total = posts.length
  const tableInfo = posts.slice(pageSize * (page - 1), pageSize* page)
  ctx.response.body = {success: 1, total: total, posts: tableInfo}
}

// markdown编辑器粘贴图片自动上传
exports.uploadImg = async (ctx, next) => {
  qiniu.conf.ACCESS_KEY = config.qiniu.AccessKey
  qiniu.conf.SECRET_KEY = config.qiniu.SecretKey
  //要上传的空间
  bucket = config.qiniu.bucket
  //上传到七牛后保存的文件名

  //生成上传 Token
  const token = uptoken(bucket)
  const url = `http://up.qiniu.com/putb64/-1`
  let res = await axios({
      method: 'post',
      url: url,
      headers: {'Authorization': `UpToken ${token}`,
                'Content-Type': "application/octet-stream"},
      data: ctx.request.body.img.split(',')[1]
    })
  ctx.response.body = {success: 1, src: `${config.qiniu.outSourceHost}${res.data.hash}`}
}

//生成七牛云token
function uptoken(bucket) {
  let putPolicy = new qiniu.rs.PutPolicy(bucket)
  return putPolicy.token()
}