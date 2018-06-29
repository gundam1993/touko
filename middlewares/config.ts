/**
 * Created by Tommy Huang on 18/04/24.
 */
import ModifiedKoa from '../server'

module.exports = (app:ModifiedKoa, baseDir:string):void => {
  const config:object = require('config-lite')({
    config_basedir: baseDir,
    config_dir: 'config'
  })
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
