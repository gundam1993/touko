import * as Koa from 'koa'
import { ModifiedContext } from '../../types/app';

export const getPostsList:Koa.Middleware = async ({model, response}:ModifiedContext) => {
  const posts = await model.Post.findAll({
    where: {display: true},
    attributes: { exclude: ['content', 'updatedAt'] },
    order: [['created_at', 'DESC']]
  })
  response.body = { 
    success: 1, 
    posts: posts 
  }
}