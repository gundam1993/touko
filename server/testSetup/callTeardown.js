require('ts-node/register')

// If you want to reference other typescript modules, do it via require:
const {teardown} = require('./setup')

module.exports = async function () {
  // Call your initialization methods here.
  teardown()
  return null
}
