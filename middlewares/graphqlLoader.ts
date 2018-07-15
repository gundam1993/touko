import ModifiedKoa from '../server'
import * as path from "path"
import * as sqlite3 from 'sqlite3'
import { readFileSync } from "fs";
import { makeExecutableSchema } from 'graphql-tools'
import resolversMaker from '../graphql'

export default (app:ModifiedKoa) => {
  loadDB(app)
  const typeDefs = loadTypeDef(app)
  const resolvers = resolversMaker(app)
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  Object.defineProperty(app, 'schema', {
    value: schema,
    writable: false,
    configurable: false
  })
}

function loadDB(app:ModifiedKoa):void  {
  const dbPath = path.join(__dirname, '../touko.db')
  const db = new sqlite3.Database(dbPath)
  // bind db
  Object.defineProperty(app, 'db', {
    value: db,
    writable: false,
    configurable: false
  })
}

function loadTypeDef(app:ModifiedKoa):string {
  let dir = app.config.graphql || '../graphql/schema.graphql'
  dir = path.join(__dirname, dir)
  console.log(dir)
  return readFileSync(dir).toString()
}