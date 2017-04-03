var sequlize = require('./database')
const Sequelize = require('sequelize')

var User = sequlize.define('user', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  username: Sequelize.STRING(100),
  password: Sequelize.STRING(100),
}, {
  timestamp: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = User