const sequelize = require('./models/database.js')
const Post = require('./models/post')
const User = require('./models/user')
const Introduction = require('./models/Introduction')

User.hasMany(Post, {foreignKey:'user_id', targetKey:'id', as:'Post'})
User.hasOne(Introduction);

Post.sync().then(function (result) {
  console.log(result)
})

User.sync().then(function (result) {
  console.log(result)
})

Introduction.sync().then(function (result) {
  console.log(result)
})