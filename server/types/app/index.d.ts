import * as Koa from "koa"
import * as Sequelize from 'sequelize'
import { ModifiedModel } from "./models";
import * as sqlite3  from "../../node_modules/@types/sqlite3"
import { GraphQLSchema } from "../../node_modules/@types/graphql"

declare interface ModifiedApp extends Koa {
  readonly BaseDir: string
  readonly isProduction: boolean
  // Sequelize: Sequelize.SequelizeStatic
  // model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  // db: sqlite3.Database
  // schema: GraphQLSchema
  config: any
  constructor(BaseDir: string, NODE_ENV:string):ModifiedKoa;
  runProduction():Promise<any>;
  // runDevAdmin():void;
  runDev():Promise<any>;
  start():void;
}

declare interface RequestWithBody extends Koa.Request {
  body: object | any
}

declare interface ModifiedContext extends Koa.Context {
  userInfo: UserInfo
  app: ModifiedKoa,
  model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  request: RequestWithBody
}

declare interface UserInfo {
  userId: number
  iss: string
  exp: number
}