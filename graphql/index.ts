import ModifiedKoa from '../server'
import { find, filter } from 'lodash'
import * as DataLoader from 'dataloader'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as sqlite3 from 'sqlite3'
import * as path from "path"


interface User {
  id: number
  username: string
  password: string
  [index:string]: string | number
}
// example data
const users:User[] = [
  { id: 1, username: 'Tom', password: 'Coleman' },
  { id: 2, username: 'Sashko', password: 'Stubailo' },
  { id: 3, username: 'Mikhail', password: 'Novikov' },
]

interface Post {
  id: number
  userId: number
  title: string
  content: string
  pv: number
}

const posts:Post[] = [
  { id: 1, userId: 1, title: 'Introduction to GraphQL', content: '', pv: 2 },
  { id: 2, userId: 2, title: 'Welcome to Meteor', content: '', pv: 3 },
  { id: 3, userId: 2, title: 'Advanced GraphQL', content: '', pv: 1 },
  { id: 4, userId: 3, title: 'Launchpad is Cool', content: '', pv: 7 },
]

interface QueryParams {
  id?: number
  postId?: number
}

// This `findBy` method simulates a database query.
const findBy = (field:string, ...values:any[]) => {
  console.log(`finding user with ${field} === ${values.join(', ')}`)
  return Promise.resolve(
    users.filter((user:User) => values.includes(user[field]))
  )
}
const findByIdLoader = new DataLoader(ids => (findBy('id', ...ids)))





export default (app:ModifiedKoa) => {
  // Parallelize all queries, but do not cache
  const queryLoader = new DataLoader(queries => new Promise<any[]>((resolve) => {
    console.log(queries)
    let waitingOn = queries.length
    let results:any[] = []
    app.db.parallelize(() => {
      queries.forEach((query:any, index) => {
        app.db.all.apply(app.db, query.concat((error:Error, result:any) => {
          results[index] = error || result
          if (--waitingOn === 0) {
            resolve(results)
          }
        }))
      })
    })
  }), {cache: false})

  const postLoader = new DataLoader(ids => {
    const params = ids.map(id => '?').join()
    const query = `SELECT * FROM posts WHERE user_id IN (${params});`
    return queryLoader.load([query, ids]).then(
      (rows:any[]) => {
        return ids.map(
        id => {
          let result =  rows.filter((row:any) => {return row.user_id === id}) || new Error(`Row not found: ${id}`)
          console.log(result)
          return result
        }
      )}
    )
  })

  const userLoader = new DataLoader(usernames => {
    const query = `SELECT * FROM users WHERE username = ?`
    return queryLoader.load([query, usernames]).then(
      (rows:any[]) => {
        return usernames.map(
          username => {
          let result =  rows.filter((row:any) => {return row.username === username}) || new Error(`Row not found: ${username}`)
          console.log(result)
          return result
        }
      )}
    )
  })



  return {
    Query: {
      posts: (_: any, {id}:QueryParams) => postLoader.load(id),
      user: async (_: any, {username}:User)  =>  {
        const users = await userLoader.load(username)
        return users[0]
      }
    },
    Mutation: {
      createToken: async (_: any, {username, password}:User) => {
        const users = await userLoader.load(username)
        const user:User = users[0]
        const passwordCheck = bcrypt.compareSync(password, user.password)
        if (!passwordCheck) throw new Error('密码错误')
        const expires = Date.now() + (60 * 60 * 1000 * app.config.cookieExpires)
        const token = jwt.sign({
          iss: 'touko',
          userId: user.id,
          exp: expires
        }, app.config.jwt.key)
        user.token = token
        return user
      },
      addPv: (_: any, {postId}:QueryParams) => {
        const post = find(posts, {id: postId})
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`)
        }
        (<Post>post).pv += 1
        return post
      }
    },
    User: {
      posts: (user:User) => postLoader.load(user.id)
    },
    Post: {
      user: (post:Post) => findByIdLoader.load(post.userId)
    }
  }
}