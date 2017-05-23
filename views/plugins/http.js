import axios from 'axios'

const Http = (context) => {
  let http = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
  })
  if (context.isServer) {
    const cookie = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('touko-blog-token='))
    console.log(cookie)
    http.interceptors.request.use((config) => {
      config.headers['X-Token'] = cookie
      return config
    })
  }
  return http
}

export default Http
