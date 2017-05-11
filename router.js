const router = require('koa-router')()
const loginCheck = require('./middlewares/loginCheck')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

router.post('/admin/login', UserController.login)

router.get('/admin/logout', loginCheck, UserController.logout)
// 获取所有文章
router.get('/api/admin/posts', loginCheck, PostController.getPosts)
// 获取草稿箱中的所有文章
router.get('/api/admin/drafts', loginCheck, PostController.getPosts)
// 发布文章
router.post('/api/admin/posts/new', loginCheck, PostController.createPost)
// 删除文章
router.get('/api/admin/post/delete/:postId', loginCheck, PostController.deletePost)
// 获取七牛云token
router.get('/api/admin/get_qi_niu_token', loginCheck, PostController.getQiNiuToken)
// 获取文章详细信息
router.get('/api/admin/post/:postId', loginCheck, PostController.getPostById)
// 修改文章
router.post('/api/admin/post/:postId', loginCheck, PostController.editPost)
// 移至草稿箱
router.get('/api/admin/post/move_to_draft/:postId', loginCheck, PostController.moveToDraft)
// 从草稿箱发布
router.get('/api/admin/post/publish/:postId', loginCheck, PostController.publishPost)
// 获取文章内容（无需登录)
router.get('/api/post/:postId', PostController.getPostById)
module.exports = router