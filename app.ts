import ModifiedKoa from './server'
const args:Array<string> = process.argv.splice(2)
const app = new ModifiedKoa(__dirname, process.env.NODE_ENV )

const targetIndex:number = args.indexOf('--target')
const target:string = args[targetIndex + 1] || ''

if (target === 'admin' && !app.isProduction) {
  app.runDevAdmin()
} else if (!app.isProduction) {
  app.runDev()
} else {
  app.runProduction()
}
app.start()
