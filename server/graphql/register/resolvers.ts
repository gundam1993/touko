import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs"
import * as md5 from "md5"
import * as yup from "yup"
import { User } from "../../entities/user"
import { formastYupError } from "../../utils/formatYupError";
import { tooShortUsername, duplicateUsername, tooShortPassword } from "./errorMessages";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, tooShortUsername)
    .max(255),
  password: yup
    .string()
    .min(6, tooShortPassword)
    .max(255)
})

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, {abortEarly: false})
      } catch(err) {
        console.log(err)
        return formastYupError(err)
      }
      const {username, password} = args
      const userAlreadyExists = await User.findOne({
        where: {username}, 
        select:["id"]
      })
      if (userAlreadyExists) {
        return [{
          path: "username",
          message: duplicateUsername
        }]
      }
      const hashedPassword = await bcrypt.hash(md5(password), 10)
      const user = User.create({
        username,
        password: hashedPassword
      })
      await user.save()
      return null
    }
  }
}