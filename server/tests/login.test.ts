import { request } from "graphql-request"
import { User } from '../entities/user'
import { createConnection } from "typeorm"
import { invalidLogin } from "../graphql/login/errorMessages";
const config:any = require('../config/test')

const username = 'testUsername'
const password = '123456'
const host = `${process.env.TEST_HOST as String}/graphql`

const registerMutation = (u: string, p: string) => `
mutation {
  register(username: "${u}", password: "${p}") {
    path
    message
  }
}
`

const loginMutation = (u: string, p: string) => `
mutation {
  login(username: "${u}", password: "${p}") {
    path
    message
  }
}
`

const badLogin = async (u:string, p:string) => {
  const response = await request(host, loginMutation(u, p))
  expect(response).toEqual({
    login: [{
      path: 'username',
      message: invalidLogin
    }]
  })
}

describe('login', () => {
  test('bad username', async () => {
    await badLogin("aaasssddd", "123456")
  })

  test('bad password', async () => {
    await request(host, registerMutation("aaasssddd", "123456"))
    await badLogin("aaasssddd", "654321")
  })

  test('could login with right username and password', async () => {
    await request(host, registerMutation("successLogin", "123456"))
    const response = await request(host, loginMutation("successLogin", "123456"))
    expect(response).toEqual({
      login: null
    })
  })
}) 