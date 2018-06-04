module.exports = app => {
  const { TEXT, INTEGER } = app.Sequelize
  const Introduction = app.model.define('introduction', {
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
