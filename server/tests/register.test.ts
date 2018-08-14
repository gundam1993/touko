import {request} from 'graphql-request'

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
  const response = await request('http://localhost:3001/graphql', mutation)
  expect(response).toEqual({"register": {"username": username}})
})