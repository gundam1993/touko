import { request } from "graphql-request"
import { User } from '../entities/user';
import ModifiedKoa from '../server'
import { duplicateUsername, tooShortUsername, tooShortPassword } from "../graphql/register/errorMessages";
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )

beforeAll(async () => {
  await app.runProduction()
  await app.start()
})

const username = 'testUsername'
const password = '123456'
const host = `http://localhost:${app.config.port}/graphql`

const mutation = (u: string, p: string) => `
mutation {
  register(username: "${u}", password: "${p}") {
    path
    message
  }
}
`
test('Register user', async () => {
  // make sure we can register a user
  const response = await request(host, mutation(username, password))
  expect(response).toEqual({"register": null})
  const users = await User.find({ where: {username}})
  expect(users).toHaveLength(1);
  const user = users[0]
  expect(user.username).toEqual(username)
  expect(user.password).not.toEqual(password)

  // test for duplicate usernames
  const response2: any = await request(host, mutation(username, password))
  expect(response2.register).toHaveLength(1)
  expect(response2.register[0].path).toEqual('username')
  expect(response2.register[0].message).toEqual(duplicateUsername)


  // catch bad usernames
  const response3: any = await request(host, mutation('a', password))
  expect(response3).toEqual({register: [{
    path: "username",
    message: tooShortUsername
  }]})

  // catch bad password
  const response4: any = await request(host, mutation(username, '123'))
  expect(response4).toEqual({register: [{
    path: "password",
    message: tooShortPassword
  }]})

  // catch bad usernames and bad password
  const response5: any = await request(host, mutation('a', '123'))
  expect(response5).toEqual({register: [{
    path: "username",
    message: tooShortUsername
  }, {
    path: "password",
    message: tooShortPassword
  }]})
})
