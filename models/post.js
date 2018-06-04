module.exports = app => {
  const { STRING, TEXT, BOOLEAN, INTEGER } = app.Sequelize
  const Post = app.model.define('post', {
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
  Post.associate = function () {
    app.model.Post.belongsTo(app.model.User)
  }
  return Post
}
