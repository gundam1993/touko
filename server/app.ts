import ModifiedKoa from './server'
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  app.runProduction()
} else {
  app.runDev()
}
app.start()
