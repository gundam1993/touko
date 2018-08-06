/**
 * Created by Tommy Huang on 18/04/22.
 */
const range = require('koa-range')
const compose = require('koa-compose')
const staticCache = require('koa-static-cache')
const LRU = require('ylru')

module.exports = (options, app) => {
  const dirs = options.dir
  if (options.dynamic && !options.files) {
    options.files = new LRU(options.maxFiles)
  }
  if (!Array.isArray(dirs)) {
    return compose([ range, staticCache(dirs, options) ])
  }
  const middlewares = [ range ]
  for (const [, dir] of dirs.entries()) {
    const newOptions = Object.assign({}, options)
    newOptions.dir = dir
    middlewares.push(staticCache(dir, newOptions))
  }
  return compose(middlewares)
}
