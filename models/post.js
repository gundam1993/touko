var sequelize = require('./database')
const Sequelize = require('sequelize')
const User = require('./user.js')

var Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  pv: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamp: true
})

module.exports = Post