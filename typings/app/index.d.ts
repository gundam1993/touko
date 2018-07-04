import * as Koa from "koa"
import * as Sequelize from 'sequelize'
import { ModifiedModel } from "./models";

declare interface ModifiedKoa extends Koa {
  readonly BaseDir: string
  readonly isProduction: boolean
  Sequelize: Sequelize.SequelizeStatic
  model: ModifiedModel.ModelDictionary & Sequelize.Sequelize
  config: any
  constructor(BaseDir: string, NODE_ENV:string);
  runProduction():Promise<any>;
  runDevAdmin():void;
  unDev():Promise<any>;
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
}