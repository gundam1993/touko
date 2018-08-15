import { Server } from "http"
import ModifiedKoa from '../server'
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )
let server:Server|undefined

export const setup = async () => {
  await app.runProduction()
  server = await app.start()
  process.env.TEST_HOST = `http://localhost:${app.config.port}`
}

export const teardown = async () => {
  if (server) {
    server.close()
  }
}
