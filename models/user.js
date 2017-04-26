var sequelize = require('./database')
const Sequelize = require('sequelize')
const Post = require('./post.js')

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
}, {
  timestamp: true
})
User.hasMany(Post, {as: 'Posts'})
module.exports = User