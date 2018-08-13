import Axios from 'axios'
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
import * as crypto from 'crypto'
import * as Koa from 'koa'
import { ModifiedContext } from '../../types/app';

// 获取相册图片信息及TOKEN
export const getImgToken:Koa.Middleware = async ({params, app, response}:ModifiedContext, next) => {
  const type = params.type
  const secret = app.config.upyun[type].secret
  const saveKey = app.config.upyun[type].saveKey
  const bucket = app.config.upyun[type].bucket
  let opts = {
    'save-key': saveKey,
    'bucket': bucket,
    'expiration': Math.round(new Date().getTime() / 1000) + 3600
  }
  let policy = tools.policy(opts)
  let token = utils.md5sum(policy + '&' + secret)
  response.body = {success: 1, token: token, policy: policy}
}

export const getSpaceUsage:Koa.Middleware = async ({params, app, response}:ModifiedContext, next) => {
  const type = params.type
  const bucket = app.config.upyun[type].bucket
  let url = `${app.config.upyun.requestUrl}/${bucket}/?usage`
  let date = (new Date()).toUTCString()
  const req = Axios.create({
    headers: {
      'Authorization': getUpSign('GET', `/${bucket}/?usage`, date, app.config),
      'Date': date
    }
  })
  let res = await req.get(url)
  response.body = {success: 1, usage: res.data}
}

export const getImgList:Koa.Middleware = async ({params, app, response}:ModifiedContext, next) => {
  const type = params.type
  const bucket = app.config.upyun[type].bucket
  console.log(app.config.upyun[type])
  console.log(bucket)
  let url = `${app.config.upyun.requestUrl}/${bucket}/`
  let date = (new Date()).toUTCString()
  const req = Axios.create({
    headers: {
      'Authorization': getUpSign('GET', `/${bucket}/`, date, app.config),
      'Date': date
    }
  })
  let res = await req.get(url)
  let fileList = []
  let fileListRaw = res.data
  let arr = fileListRaw.split('\n')
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let file = arr[i].split('\t')
    if (file[0] === '') { continue }
    fileList.push({
      name: file[0],
      type: file[1],
      size: file[2],
      updatedAt: file[3]
    })
  }
  response.body = {success: 1, fileList: fileList}
}

export const deleteImg:Koa.Middleware = async ({params, app, response}:ModifiedContext, next) => {
  const {type, image} = params
  const bucket = app.config.upyun[type].bucket
  let url = `${app.config.upyun.requestUrl}/${bucket}/${image}`
  let date = (new Date()).toUTCString()
  const req = Axios.create({
    headers: {
      'Authorization': getUpSign('DELETE', `/${bucket}/${image}`, date, app.config),
      'Date': date
    }
  })
  let res = await req.delete(url)
  if (res.status === 200) {
    response.body = { success: 1 }
  } else {
    response.body = { success: 0, msg: '删除失败' }
  }
}


function getUpSign (method:string, remotePath:string, date:string, config:any):string {
  const operator = config.upyun.operator
  const password = config.upyun.password
  let str = `${method}&${remotePath}&${date}`
  let sign = crypto.createHmac('sha1', utils.md5sum(password)).update(str, 'utf8').digest().toString('base64')
  return `UpYun ${operator}:${sign}`
}
