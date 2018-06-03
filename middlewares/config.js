/**
 * Created by Tommy Huang on 18/04/24.
 */
module.exports = (app, baseDir) => {
  const config = require('config-lite')({
    config_basedir: baseDir,
    config_dir: 'config'
  })
  console.log(config)
  // bind app.config
  Object.defineProperty(app, 'config', {
    value: config,
    writable: false,
    configurable: false
  })
  Object.defineProperty(app.context, 'config', {
    value: app.config,
    writable: false,
    configurable: false
  })
}
