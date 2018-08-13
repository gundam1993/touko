/// <reference path="../types/schema.d.ts" />

import { IResolvers } from "../../node_modules/graphql-tools";

export const resolvers: IResolvers = {
  Query: {
    post: (_, {id}: GQL.IPostOnQueryArguments) => {
      return {
        id: id,
        title: `test-${id}`,
        content: 'test',
        pv: 0,
        display: true,
        created_at: 'xxxx-xx-xx',
        updated_at: 'xxxx-xx-xx'
      }
    }
  },
  Mutation: {
    addPv: (_, {postId}: GQL.IAddPvOnMutationArguments) => {
      return {
        id: postId,
        title: `test-${postId}`,
        content: 'test',
        pv: 1,
        display: true,
        created_at: 'xxxx-xx-xx',
        updated_at: 'xxxx-xx-xx'
      }
    }
  }
}