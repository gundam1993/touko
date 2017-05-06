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
  qiniu: {
    AccessKey: 'n074yJ94NCNU2JiyHm528874gwtWD7ozVdI198Zh',
    SecretKey: '_uGwmseJXcNkpBMXSNyvWIj5UtvBnX964_xIu13A',
    bucket: 'blog',
    outSourceHost: 'http://oph4exrt7.bkt.clouddn.com/'
  }
}