import { request } from 'graphql-request'
import { User } from '../entities/user';
import ModifiedKoa from '../server'
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )

beforeAll(async () => {
  await app.runProduction()
  await app.start()
})

const username = 'testUsername'
const password = 'kabgfasdjk'

const mutation = `
mutation {
  register(username: "${username}", password: "${password}") {
    username
  }
}
`
test('Register user', async () => {
  const response = await request(`http://localhost:${app.config.port}/graphql`, mutation)
  expect(response).toEqual({"register": {"username": username}})
  const users = await User.find({ where: {username}})
  expect(users).toHaveLength(1);
  const user = users[0]
  expect(user.password).not.toEqual(password)
})
