const router = require('koa-router')()
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

router.post('/admin/login', UserController.login)

// router.get('/createAdmin', UserController.createUser)

router.get('/api/admin/posts', PostController.getPosts)

module.exports = router