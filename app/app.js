var express = require("express")

module.exports = {
  start: function start(server) {
    var app = express()
    this.configure.start(app)
    
    this.routes.registerRoutes(app)
    
    server.on("request", app)
  }
}