import ModifiedKoa from '../server'
import * as Sequelize from '../middlewares/sequelize'

module.exports = (app: ModifiedKoa):Sequelize.Models => {
  const { TEXT, INTEGER } = app.Sequelize
  const Introduction: Sequelize.Models = app.model.define('introduction', {
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
