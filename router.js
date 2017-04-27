const router = require('koa-router')()
const loginCheck = require('./middlewares/loginCheck')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

router.post('/admin/login', UserController.login)

router.get('/admin/logout', loginCheck, UserController.logout)

router.get('/api/admin/posts', loginCheck, PostController.getPosts)

module.exports = router