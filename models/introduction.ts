import ModifiedKoa from '../server'
import * as Sequelize from 'sequelize'
import { ModifiedModel } from '../typings/app/models';

const introduction:ModifiedModel.modelFunc = (app: ModifiedKoa) => {
  const { TEXT, INTEGER } = app.Sequelize
  const Introduction:Sequelize.Model<string, object> = app.model.define('introduction', {
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
    timestamp: true
  })
  return Introduction
}

module.exports = introduction