const config = require('config-lite')
const Post = require('../models/post')
const qiniu = require('qiniu')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

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

exports.createPost = async (ctx, next) => {
  const userId = ctx.userInfo.userId
  const post = ctx.request.body
  console.log(userId)
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
