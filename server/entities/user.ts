// import ModifiedKoa from '../server'
// import { ModifiedModel, UserAttributes, UserInstance } from '../typings/app/models';
// import * as Sequelize from 'sequelize'

// const user:ModifiedModel.modelFunc = (app:ModifiedKoa) => {
//   const { STRING, INTEGER } = app.Sequelize
//   const User:Sequelize.Model<UserInstance, UserAttributes> = app.model.define('user', {
//     id: {
//       type: INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: STRING,
//       allowNull: false
//     },
//     password: {
//       type: STRING,
//       allowNull: false
//     }
//   }, {
//     timestamps: true
//   })
//   User.associate = function (models) {
//     models.User.hasMany(models.Post, {as: 'Posts'})
//   }
//   return User
// }

// module.exports = user

import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity} from 'typeorm'

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', {length: 255})
  username: string = ''

  @Column('text')
  password: string = ''

  @CreateDateColumn ({type: "text"})
  created_at?: string

  @UpdateDateColumn({type: "text"})
  updated_at?: string
}
