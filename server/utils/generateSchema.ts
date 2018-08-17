import { GraphQLSchema } from "graphql"
import * as fs from 'fs'
import * as path from 'path'
import { importSchema } from "graphql-import"
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

export const generateSchema = () => {
  const schemas: GraphQLSchema[] = []
  console.log()
  const folders = fs.readdirSync(path.join(__dirname, '../graphql'))
  folders.forEach((folder) => {
    if (/\./.test(folder)) {
      return
    }
    const { resolvers } = require(`../graphql/${folder}/resolvers`)
    const typeDefs = importSchema(path.join(__dirname, `../graphql/${folder}/schema.graphql`))
    schemas.push(makeExecutableSchema({ typeDefs, resolvers }))
  })
  return mergeSchemas({schemas})
}