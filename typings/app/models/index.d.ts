import * as Sequelize from 'sequelize'
import ModifiedKoa from '../../../server';
declare namespace ModifiedModel {
  interface modelFunc {
    (app:ModifiedKoa): any
  }

  interface ModelDictionary {
    [index:string]: Sequelize.Model<IntroductionInstance, IntroductionAttributes> & 
                    Sequelize.Model<PostInstance, PostAttributes> &
                    Sequelize.Model<UserInstance, UserAttributes>
  }
}

declare interface IntroductionAttributes {
  id?: number
  content: string
  userId: number
  createdAt?: string
  updatedAt?: string
}

type IntroductionInstance = Sequelize.Instance<IntroductionAttributes> & IntroductionAttributes

declare interface PostAttributes {
  id?: number
  title: string
  content: string
  pv?: number
  display?: boolean
  userId: number
  createdAt?: string
  updatedAt?: string
}

type PostInstance = Sequelize.Instance<PostAttributes> & PostAttributes

declare interface UserAttributes {
  id?: number
  username: string
  password: string
  createdAt?: string
  updatedAt?: string
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes
