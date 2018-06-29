import ModifiedKoa from '../server'
import * as Sequelize from '../middlewares/sequelize'

module.exports = (app:ModifiedKoa):Sequelize.Models => {
  const { STRING, INTEGER } = app.Sequelize
  const User = app.model.define('user', {
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
