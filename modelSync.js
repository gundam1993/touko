const sequelize = require('./models/database.js')
const Post = require('./models/post')

Post.sync().then(function (result) {
  console.log(result)
})