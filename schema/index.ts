import * as GraphQLTools from 'graphql-tools'
import { makeExecutableSchema } from 'graphql-tools'
import { find, filter } from 'lodash'

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  #the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  #this schema allows the following mutation
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`

interface Author {
  id: number
  firstName: string
  lastName: string
}
// example data
const authors:Author[] = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
]

interface Post {
  id: number
  authorId: number
  title: string
  votes: number
}

const posts:Post[] = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
]

interface QueryParams {
  id?: number
  postId?: number
}

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_: any, {id}:QueryParams) => find(authors, {id})
  },
  Mutation: {
    upvotePost: (_: any, {postId}:QueryParams) => {
      const post = find(posts, {id: postId})
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`)
      }
      (<Post>post).votes += 1
      return post
    }
  },
  Author: {
    posts: (author:Author) => filter(posts, {authorId: author.id})
  },
  Post: {
    author: (post:Post) => find(authors, {id: post.authorId})
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})