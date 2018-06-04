module.exports = {
  host: '127.0.0.1',
  port: 3000,
  production: false,
  cookieKey: [''],
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
    operator: '',
    password: '',
    image: {
      bucket: '',
      url: '',
      secret: '',
      saveKey: '/img_{random}{.suffix}'
    },
    photo: {
      bucket: '',
      url: '',
      secret: '',
      saveKey: ''
    }
  }
}
