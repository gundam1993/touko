import { Entity, Column, PrimaryGeneratedColumn } from "../../node_modules/typeorm";

// import ModifiedKoa from '../server'
// import * as Sequelize from 'sequelize'
// import { ModifiedModel, IntroductionAttributes, IntroductionInstance } from '../typings/app/models';

// const introduction:ModifiedModel.modelFunc = (app: ModifiedKoa) => {
//   const { TEXT, INTEGER } = app.Sequelize
//   const Introduction = app.model.define<IntroductionInstance, IntroductionAttributes>('introduction', {
//     id: {
//       type: INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     content: {
//       type: TEXT,
//       allowNull: true
//     },
//     userId: {
//       type: INTEGER
//     }
//   }, {
//     timestamps: true
//   })
//   return Introduction
// }

// module.exports = introduction

@Entity('introductions')
export class Introduction {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  content: string

  @Column('integer')
  userId: number

  @Column('text')
  created_at: string

  @Column('text')
  updated_at: string
  
}