const router = require('koa-router')()
const User = require('./controllers/user')

router.post('/admin/login', User.login)

router.get('/createAdmin', User.createUser)


module.exports = router