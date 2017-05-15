var sequelize = require('./database')
const Sequelize = require('sequelize')
const User = require('./user.js')

var Introduction = sequelize.define('introductions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true
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

module.exports = Introduction