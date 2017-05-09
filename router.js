const router = require('koa-router')()
const loginCheck = require('./middlewares/loginCheck')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

router.post('/admin/login', UserController.login)

router.get('/admin/logout', loginCheck, UserController.logout)
// 获取所有文章
router.get('/api/admin/posts', loginCheck, PostController.getPosts)
// 发布文章
router.post('/api/admin/posts/new', loginCheck, PostController.createPost)
//删除文章
router.get('/api/admin/post/delete/:postId', loginCheck, PostController.deletePost)
// 获取七牛云token
router.get('/api/admin/get_qi_niu_token', loginCheck, PostController.getQiNiuToken)

module.exports = router