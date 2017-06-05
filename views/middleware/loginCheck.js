export default function (context) {
  let jwt = getTokenFromCookie(context)
  if (/^\/admin/.test(context.route.path)) {
    if (context.route.name !== 'admin-login' && !jwt) {
      context.redirect('/admin/login')
    }
    if (context.route.name === 'admin-login' && jwt) {
      context.redirect('/admin')
    }
  }
}

function getTokenFromCookie (context) {
  let cookie = (context.isClient ? document.cookie : context.req.headers.cookie)
  if (cookie) {
    return cookie.split(';').find(c => c.trim().startsWith('touko-blog-token='))
  } else {
    return undefined
  }
}
