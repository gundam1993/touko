module.exports = {
  port: 3000,
  db: {
    name: 'touko',
    username: 'tianyao',
    password: '',
    host: 'localhost',
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
    operator: 'gundam1993',
    password: '211993007gundam',
    imgBucket: 'touko-blog-img',
    imgUrl: 'touko-blog-img.b0.upaiyun.com',
    imgSecret: '+oZjgSf18qnc0PaP+qZFUM7D+aM=',
    imgSaveKey: '/img_{random}{.suffix}'
  }
}