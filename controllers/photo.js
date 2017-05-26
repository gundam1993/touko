const config = require('config-lite')
const axios = require('axios')
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
const crypto = require('crypto')

// 获取相册图片信息及TOKEN 
exports.getImgToken = async (ctx, next) => {
  const type = ctx.params.type
  const operator = config.upyun.operator
  const password = config.upyun.password
  const secret = config.upyun[type].secret
  const saveKey = config.upyun[type].saveKey
  const bucket = config.upyun[type].bucket
  let opts = {
    'save-key': saveKey,
    'bucket': bucket,
    'expiration': Math.round(new Date().getTime() / 1000) + 3600
  }
  let policy = tools.policy(opts)
  let token = utils.md5sum(policy + '&' + secret)
  ctx.response.body = {success: 1, token: token, policy: policy}
}

exports.getSpaceUsage = async (ctx, next) => {
  const type = ctx.params.type
  const bucket = config.upyun[type].bucket
  let url = `${config.upyun.requestUrl}/${bucket}/?usage`
  let date = (new Date()).toGMTString()
  const req = axios.create({
    headers: {
              'Authorization': getUpSign('GET', `/${bucket}/?usage`, date),
              'Date': date
             }
  });
  let res = await req.get(url)
  ctx.response.body = {success: 1, usage: res.data}
}

exports.getImgList = async (ctx, next) => {
  const type = ctx.params.type
  const bucket = config.upyun[type].bucket
  let url = `${config.upyun.requestUrl}/${bucket}/`
  let date = (new Date()).toGMTString()
  const req = axios.create({
    headers: {
              'Authorization': getUpSign('GET', `/${bucket}/`, date),
              'Date': date
             }
  });
  let res = await req.get(url)
  ctx.response.body = {success: 1, fileList: res.data}
}

exports.deleteImg = async (ctx, next) => {
  const type = ctx.params.type
  const image = ctx.params.image
  const bucket = config.upyun[type].bucket
  let url = `${config.upyun.requestUrl}/${bucket}/${image}`
  let date = (new Date()).toGMTString()
  const req = axios.create({
    headers: {
              'Authorization': getUpSign('DELETE', `/${bucket}/${image}`, date),
              'Date': date
             }
  });
  let res = await req.delete(url)
  if (res.status === 200) {
    ctx.response.body = { success: 1 }
  } else {
    ctx.response.body = { success: 0, msg: '删除失败' }
  }
}

function getUpSign(method, remotePath, date) {
  const operator = config.upyun.operator
  const password = config.upyun.password
  let str = `${method}&${remotePath}&${date}`
  let sign = crypto.createHmac('sha1', utils.md5sum(password)).update(str, 'utf8').digest().toString('base64')
  return `UpYun ${operator}:${sign}`
}
