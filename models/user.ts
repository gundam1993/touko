import ModifiedKoa from '../server'
import { ModifiedModel } from '../typings/app/models';
import * as Sequelize from 'sequelize'

const user:ModifiedModel.modelFunc = (app:ModifiedKoa) => {
  const { STRING, INTEGER } = app.Sequelize
  const User:Sequelize.Model<string, object> = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    }
  }, {
    timestamp: true
  })
  User.associate = function () {
    app.model.User.hasMany(app.model.Post, {as: 'Posts'})
  }
  return User
}

module.exports = user
