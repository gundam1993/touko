module.exports = {
  host: '127.0.0.1',
  port: 3000,
  production: false,
  cookieKey: ['the suicidal mime'],
  db: {
    name: 'touko',
    username: 'tianyao',
    password: '',
    host: 'localhost',
    dialect: 'sqlite',
    storage: './touko.db',
    port: 5432
  },
  bcrypt: {
    saltRounds: 10
  },
  jwt: {
    key: 'I am the Alpha and the Omega, the First and the Last, the Beginning and the End.'
  },
  cookieExpires: 7,
  baseUrl: 'http://localhost:3000',
  upyun: {
    requestUrl: 'http://v0.api.upyun.com',
    operator: 'gundam1993',
    password: '211993007gundam',
    image: {
      bucket: 'touko-blog-img',
      url: 'touko-blog-img.b0.upaiyun.com',
      secret: '+oZjgSf18qnc0PaP+qZFUM7D+aM=',
      saveKey: '/img_{random}{.suffix}'
    },
    photo: {
      bucket: 'touko-blog-photo',
      url: '  touko-blog-photo.b0.upaiyun.com',
      secret: '34SO/SXtrPrMv00zYdk+KIOOd2Y=',
      saveKey: '/photo_{random}{.suffix}'
    }
  }
}
