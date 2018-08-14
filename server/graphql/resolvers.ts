/// <reference path="../types/schema.d.ts" />

import { ResolverMap } from "../types/graphql-utils";
import * as bcrypt from "bcryptjs"
import * as md5 from "md5"
import { User } from "../entities/user";

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
    register: async (_, {username, password}: GQL.IRegisterOnMutationArguments) => {
      const hashedPassword = await bcrypt.hash(md5(password), 10)
      const user = User.create({
        username,
        password: hashedPassword
      })
      await user.save()
      return user
    },
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