import ModifiedKoa from './server'
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )

if (!app.isProduction) {
  app.runDev()
} else {
  app.runProduction()
}
app.start()
