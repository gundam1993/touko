/// <reference path="../../types/schema.d.ts" />

import * as bcrypt from "bcryptjs"
import * as md5 from "md5"
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entities/user"
import { invalidLogin } from "./errorMessages";

const errorRes = [{
  path: 'username',
  message: invalidLogin
}]

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, {username, password}: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({where: {
        username
      }})
      if (!user) {
        return errorRes
      }
      if (!bcrypt.compareSync(md5(password), user.password)) {
        return errorRes
      }
      return null
    }
  }
}