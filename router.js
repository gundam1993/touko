const router = require('koa-router')()
const User = require('./controllers/user')

router.get('/123', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>'
})

router.post('/admin/login', User.login)

router.get('/createAdmin', User.createUser)


module.exports = router