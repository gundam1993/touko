export default function (context) {
  let jwt = (context.isClient ? getTokenFromLocalStorage(context) : getTokenFromCookie(context))
  if (context.route.name !== 'admin-login') {
    if (!jwt) {
      context.redirect('/admin/login')
    }
  }
  if (context.route.name === 'admin-login') {
    if (jwt) {
      context.redirect('/admin')
    }
  }
}

function getTokenFromCookie (context) {
  let cookie = context.req.headers.cookie
  if (cookie) {
    return cookie.split(';').find(c => c.trim().startsWith('touko-blog-token='))
  } else {
    return undefined
  }
}

function getTokenFromLocalStorage (context) {
  return localStorage['touko-blog-token']
}
