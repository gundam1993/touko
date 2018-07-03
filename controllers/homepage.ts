import * as Koa from 'koa'
import * as Sequelize from '../middlewares/sequelize'
import { ModifiedContext } from '../typings/app';

export const getPostsList= async ({model, response}:ModifiedContext) => {
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