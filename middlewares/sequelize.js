/**
 * Created by Tommy Huang on 18/04/24.
 */
const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')
const chalk = require('chalk')

Sequelize.prototype.log = function () {
  if (this.options.logging === false) return
  const args = Array.prototype.slice.call(arguments)
  const sql = args[0].replace(/Executed \(.+?\):\s{0,1}/, '')
  this.options.logging('[model]', chalk.magenta(sql), `(${args[1]}ms)`)
}

module.exports = (app, config) => {
  console.log(config)
  if (!config.host || !config.port || !config.dialect) throw new Error('[sequelize Error] need config to start')
  const defalutConfig = {
    logging: console.log,
    operatorsAliases: false,
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true
    }
  }
  const dbConfig = Object.assign(defalutConfig, config)
  app.Sequelize = Sequelize
  const sequelize = new Sequelize(config.name, config.username, config.password, dbConfig)

  // bind app.sequelize
  Object.defineProperty(app, 'model', {
    value: sequelize,
    writable: false,
    configurable: false
  })
  loadModel(app)
  Object.defineProperty(app.context, 'model', {
    value: app.model,
    writable: false,
    configurable: false
  })
  app.model.authenticate()
}

function loadModel (app) {
  const modelDir = path.join(app.BaseDir, 'models')
  let fileNames = fs.readdirSync(modelDir).filter(item => (item.match(/\.js$/) && item !== 'index.js'))
  fileNames.forEach(fileName => {
    const model = require(path.join(modelDir, fileName))(app)
    let modelName = model.name.replace(/[_-][a-z]/ig, s => s.substring(1).toUpperCase())
    modelName = modelName[0].toUpperCase() + modelName.substring(1)
    app.model[modelName] = model
  })
  for (const name of Object.keys(app.model)) {
    const klass = app.model[name]

    if ('associate' in klass) {
      klass.associate()
    }
  }
}
