import { Server } from "http"
import ModifiedKoa from '../server'
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )
let server:Server|undefined

afterAll(() => {
  if (server) {
    server.close()
  }
})

export const setup = async () => {
  await app.runProduction()
  server = await app.start()
}
