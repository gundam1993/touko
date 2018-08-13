import { marked } from './helper'
import * as Koa from 'koa'
import { ModifiedContext } from '../../types/app';
import { PostInstance, PostAttributes } from '../../types/app/models';
import * as Sequelize from 'sequelize'

interface PostQuery {
  search?: string
  postId?: number
}

interface PostBody {
  title: string
  content: string
  display?: boolean
}

// 获取所有文章，需登录
export const getAllPosts:Koa.Middleware = async ({request, response, model, userInfo, app}:ModifiedContext) => {
  const userId = userInfo.userId
  const Op = app.Sequelize.Op
  let {search}:PostQuery = request.query
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
export const createPost:Koa.Middleware = async ({request, response, model, userInfo}:ModifiedContext) => {
  const userId = userInfo.userId
  const { title, content, display }:PostBody = request.body
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
export const deletePost:Koa.Middleware = async ({response, params, userInfo, model}:ModifiedContext) => {
  const userId = userInfo.userId
  const {postId}:PostQuery = params
  await model.Post.destroy({ where: {userId: userId, id: postId} })
  response.body = {success: 1, msg: '删除成功'}
}

// 按id获取文章详细信息
export const getPostById:Koa.Middleware = async ({response, params, model}:ModifiedContext) => {
  const {postId}:PostQuery = params
  const post = await (<Sequelize.Model<PostInstance, PostAttributes>>model.Post).findOne({
    where: {id: postId},
    attributes: ['id', 'content', ['created_at', 'createdAt'], 'pv', 'title']
  })
  await post.update({pv: post.pv++ })
  const html = marked(post.content)
  response.body = {
    success: 1,
    msg: '查询成功',
    post: {
      html: html,
      content: post.content,
      id: post.id,
      title: post.title,
      createdAt: post.createdAt
    }
  }
}

// 修改文章
export const editPost:Koa.Middleware = async ({response, params, userInfo, model, request}:ModifiedContext) => {
  const userId = userInfo.userId
  const {postId}:PostQuery = params
  const {title, content, display}:PostBody = request.body
  if (!title || !content) throw new Error('请完成文章后再发布')
  await model.Post.update(
    {title: title, content: content, display: display},
    { where: {userId: userId, id: postId},
      fields: ['title', 'content', 'display']})
  response.body = {success: 1, msg: '编辑成功'}
}

// 将已发布的文章移到草稿箱
export const moveToDraft:Koa.Middleware = async ({response, params, userInfo, model}:ModifiedContext) => {
  const userId = userInfo.userId
  const {postId}:PostQuery = params
  await model.Post.update({display: false}, {where: {userId: userId, id: postId}})
  response.body = {success: 1, msg: '移动成功'}
}

// 从草稿箱发布文章
export const publishPost:Koa.Middleware = async ({response, params, userInfo, model}:ModifiedContext) => {
  const userId = userInfo.userId
  const {postId}:PostQuery = params
  await model.Post.update(
    { display: true },
    {where: { userId: userId, id: postId }})
  response.body = {success: 1, msg: '发布成功'}
}

