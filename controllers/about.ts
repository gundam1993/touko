import * as Koa from 'koa'
import { ModifiedContext } from '../typings/app';
import { marked } from './helper'

export const getAboutInfo:Koa.Middleware = async ({response, model}:ModifiedContext) => {
  const about = await model.Introduction.findOne(
    {attributes: ['content']}
  )
  response.body = {
    success: 1,
    content: about.content || '',
    html: about ? marked(about.content) : ''
  }
}

interface InformationupdateBody {
  content: string
}

export const updateAboutInfo:Koa.Middleware = async ({response, request, userInfo, model}:ModifiedContext) => {
  let userId = userInfo.userId
  const {content}:InformationupdateBody = request.body
  const about = await model.Introduction.findOne({ where: { userId: userId } })
  const update = !!about
          ? await model.Introduction.update({ content: content }, { where: { userId: userId } })
          : await model.Introduction.create({content: content, userId: userId})
  response.body = { success: 1, msg: '更新成功' }
}
