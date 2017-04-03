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
  }
}