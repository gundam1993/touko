const config = require('config-lite').db
const Sequelize = require('sequelize')

var sequlize = new Sequelize(config.name, config.username, config.password, {
  host: config.host,
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  storage: './touko.db',
})

module.exports = sequlize