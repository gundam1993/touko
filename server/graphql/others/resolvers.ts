/// <reference path="../../types/schema.d.ts" />

import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    post: (_, {id}: GQL.IPostOnQueryArguments) => {
      return {
        id,
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
    addPv: async (_, {postId}: GQL.IAddPvOnMutationArguments) => {
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