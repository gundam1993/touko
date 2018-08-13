
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import {resolvers} from './resolvers'
import * as path from "path"
// import ModifiedKoa from '../server'
// import { find, filter } from 'lodash'
// import * as DataLoader from 'dataloader'
// import * as bcrypt from 'bcryptjs'
// import * as jwt from 'jsonwebtoken'
// import * as md5 from 'md5'
// import * as path from "path"
// import { UserAttributes, PostAttributes, PostInstance } from '../typings/app/models';
// import { FindOptions, WhereOptions } from 'sequelize';



// interface User {
//   id: number
//   username: string
//   password: string
//   [index:string]: string | number
// }

// interface Post {
//   id: number
//   userId: number
//   title: string
//   content: string
//   pv: number
// }

// interface QueryParams {
//   id?: number
//   postId?: number
// }

// export default (app:ModifiedKoa) => {
//   // Parallelize all queries, but do not cache
//   const queryLoader = new DataLoader(queries => new Promise<any[]>((resolve) => {
//     console.log(queries)
//     let waitingOn = queries.length
//     let results:any[] = []
//     app.db.parallelize(() => {
//       queries.forEach((query:any, index) => {
//         app.db.all.apply(app.db, query.concat((error:Error, result:any) => {
//           results[index] = error || result
//           if (--waitingOn === 0) {
//             resolve(results)
//           }
//         }))
//       })
//     })
//   }), {cache: false})

//   const postLoader = new DataLoader( async (ids) => {
//     const params = ids.map(id => '?').join()
//     const query = `SELECT * FROM posts WHERE user_id IN (${params});`
//     const rows = await queryLoader.load([query, ids])
//     return  ids.map(id => {
//       let result =  rows.filter((row:any) => {return row.user_id === id}) || new Error(`Row not found: ${id}`)
//       console.log(result)
//       return result
//     })
//   })

//   const userLoader = new DataLoader(usernames => {
//     const query = `SELECT * FROM users WHERE username = ?`
//     return queryLoader.load([query, usernames]).then(
//       (rows:any[]) => {
//         return usernames.map(
//           username => {
//           let result =  rows.filter((row:any) => {return row.username === username}) || new Error(`Row not found: ${username}`)
//           console.log(result)
//           return result
//         }
//       )}
//     )
//   })



//   return {
//     Query: {
//       posts: (_: any, {id}:QueryParams) => {
//         let where:WhereOptions<PostAttributes> = {}
//         if (id) where.id = id
//         const posts = app.model.Post.findAll({where: where})
//         return posts
//       },
//       post: (_: any, {id}:QueryParams) => {
//         let where:WhereOptions<PostAttributes> = {}
//         if (id) where.id = id
//         return  app.model.Post.findOne({where: where})
//       },
//       user: (_: any, query:User) => {
//         let find:FindOptions<UserAttributes> = {}
//         find.where = query || {}
//         return app.model.User.findOne(find)
//       },
//       introduction : (_:any, {id}:QueryParams) => {
//         return app.model.Introduction.findOne({ where: { userId: id } })
//       }
//     },
//     Mutation: {
//       createToken: async (_: any, {username, password}:User) => {
//         const users = await userLoader.load(username)
//         const user:User = users[0]
//         const passwordCheck = bcrypt.compareSync(md5(password), user.password)
//         if (!passwordCheck) throw new Error('密码错误')
//         const expires = Date.now() + (60 * 60 * 1000 * app.config.cookieExpires)
//         const token = jwt.sign({
//           iss: 'touko',
//           userId: user.id,
//           exp: expires
//         }, app.config.jwt.key)
//         user.token = token
//         return user
//       },
//       addPv: async (_: any, {postId}:QueryParams) => {
//         const [update, query] = await app.model.query(`UPDATE posts SET pv = pv + 1 WHERE id = ? `, {replacements: [postId]})
//         return app.model.Post.findOne({where: {id: postId}})
//       },
    
//     },
//     User: {
//       posts: (user:User) => postLoader.load(user.id)
//     },
//     Post: {
//       // user: (post:Post) => findByIdLoader.load(post.userId)
//     }
//   }
// }

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'))
export const schema = makeExecutableSchema({ typeDefs, resolvers })
