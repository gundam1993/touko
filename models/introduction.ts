import ModifiedKoa from '../server'
import * as Sequelize from 'sequelize'
import { ModifiedModel, IntroductionAttributes, IntroductionInstance } from '../typings/app/models';

const introduction:ModifiedModel.modelFunc = (app: ModifiedKoa) => {
  const { TEXT, INTEGER } = app.Sequelize
  const Introduction = app.model.define<IntroductionInstance, IntroductionAttributes>('introduction', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    userId: {
      type: INTEGER
    }
  }, {
    timestamps: true
  })
  return Introduction
}

module.exports = introduction