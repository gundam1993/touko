var cluster = require('cluster');

cluster.setupMaster({
  exec: 'server.js'
})

var cpus = require('os').cpus()

for (var i = 0; i < 10; i++) {
  cluster.fork()
}