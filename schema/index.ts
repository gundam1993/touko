import { makeExecutableSchema } from 'graphql-tools'
import { find, filter } from 'lodash'
import * as DataLoader from 'dataloader'
import * as sqlite3 from 'sqlite3'

const db = new sqlite3.Database('../touko.db')

const typeDefs = `
  type User {
    id: Int!
    username: String
    password: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    content: String
    user: User
    display: Boolean
    pv: Int
  }

  type Introduction {
    id: Int!
    content: String
    user: User
  }

  #the schema allows the following query:
  type Query {
    posts: [Post]
    user(id: Int!): User
  }

  #this schema allows the following mutation
  type Mutation {
    addPv (
      postId: Int!
    ): Post
  }
`

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

const findBy = (field:string, value:any) => {
  console.log(`finding user with ${field} === ${value}`)
  return users.filter((user:User) => user[field] === value)
}

const resolvers = {
  Query: {
    posts: () => posts,
    user: (_: any, {id}:QueryParams)  =>  find(users, {id: id})
  },
  Mutation: {
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
    posts: (user:User) => filter(posts, {userId: user.id})
  },
  Post: {
    user: (post:Post) => find(users, {id: post.userId})
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})