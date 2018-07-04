import ModifiedKoa from '../server'
import * as Sequelize from 'sequelize'
import { ModifiedModel, PostAttributes, PostInstance } from '../typings/app/models';

const post:ModifiedModel.modelFunc = (app:ModifiedKoa) => {
  const { STRING, TEXT, BOOLEAN, INTEGER } = app.Sequelize
  const Post:Sequelize.Model<PostAttributes, PostInstance> = app.model.define('post', {
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  Post.associate = function (models):void {
    models.Post.belongsTo(models.User)
  }
  return Post
}
module.exports = post
