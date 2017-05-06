const router = require('koa-router')()
const loginCheck = require('./middlewares/loginCheck')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

router.post('/admin/login', UserController.login)

router.get('/admin/logout', loginCheck, UserController.logout)

router.get('/api/admin/posts', loginCheck, PostController.getPosts)
// markdown编辑器粘贴图片自动上传
router.post('/api/admin/upload_img', loginCheck, PostController.uploadImg)

module.exports = router