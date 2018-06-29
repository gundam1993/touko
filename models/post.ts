import ModifiedKoa from '../server'
import * as Sequelize from '../middlewares/sequelize'

module.exports = (app:ModifiedKoa):Sequelize.Models => {
  const { STRING, TEXT, BOOLEAN, INTEGER } = app.Sequelize
  const Post:Sequelize.Models = app.model.define('post', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: STRING,
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    pv: {
      type: INTEGER,
      defaultValue: 0
    },
    display: {
      type: BOOLEAN,
      defaultValue: true
    },
    userId: {
      type: INTEGER,
      field: 'user_id'
    }
  }, {
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  Post.associate = function ():void {
    app.model.Post.belongsTo(app.model.User)
  }
  return Post
}
