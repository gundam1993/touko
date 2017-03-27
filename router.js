const router = require('koa-router')()

router.get('/123', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>'
})

router.post('/admin/signin', async (ctx, next) => {
  console.log('post signin info')
  console.log(ctx.request.body)
  ctx.status = 200
})

module.exports = router