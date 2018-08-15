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

describe('register mutation test', () => {
  test('check for duplicate usernames', async () => {
    const response = await request(host, mutation(username, password))
    expect(response).toEqual({"register": null})
    const users = await User.find({ where: {username}})
    expect(users).toHaveLength(1);
    const user = users[0]
    expect(user.username).toEqual(username)
    expect(user.password).not.toEqual(password)

    const response1: any = await request(host, mutation(username, password))
    expect(response1.register).toHaveLength(1)
    expect(response1.register[0].path).toEqual('username')
    expect(response1.register[0].message).toEqual(duplicateUsername)
  })

  test('catch bad usernames', async () => {
    const response: any = await request(host, mutation('a', password))
    expect(response).toEqual({register: [{
      path: "username",
      message: tooShortUsername
    }]})
  })

  test('catch bad password', async () => {
    const response: any = await request(host, mutation(username, '123'))
    expect(response).toEqual({register: [{
      path: "password",
      message: tooShortPassword
    }]})
  })

  test('catch bad usernames and bad password', async () => {
    const response: any = await request(host, mutation('a', '123'))
    expect(response).toEqual({register: [{
      path: "username",
      message: tooShortUsername
    }, {
      path: "password",
      message: tooShortPassword
    }]})
  })
})

