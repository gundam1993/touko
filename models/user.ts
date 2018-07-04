import ModifiedKoa from '../server'
import { ModifiedModel, UserAttributes, UserInstance } from '../typings/app/models';
import * as Sequelize from 'sequelize'

const user:ModifiedModel.modelFunc = (app:ModifiedKoa) => {
  const { STRING, INTEGER } = app.Sequelize
  const User:Sequelize.Model<UserInstance, UserAttributes> = app.model.define('user', {
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
    timestamps: true
  })
  User.associate = function (models) {
    models.User.hasMany(models.Post, {as: 'Posts'})
  }
  return User
}

module.exports = user
