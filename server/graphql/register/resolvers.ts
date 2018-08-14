/// <reference path="../../types/schema.d.ts" />

import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs"
import * as md5 from "md5"
import * as yup from "yup"
import { User } from "../../entities/user"

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255),
  password: yup
    .string()
    .min(6)
    .max(255)
})

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, {abortEarly: false})
      } catch(err) {
        console.log(err)
      }
      const {username, password} = args
      const userAlreadyExists = await User.findOne({
        where: {username}, 
        select:["id"]
      })
      if (userAlreadyExists) {
        return [{
          path: "username",
          message: "该用户名已存在"
        }]
      }
      const hashedPassword = await bcrypt.hash(md5(password), 10)
      const user = User.create({
        username,
        password: hashedPassword
      })
      await user.save()
      return user
    }
  }
}