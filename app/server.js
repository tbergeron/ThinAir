var http = require("http")

module.exports = {
  init: function init() {
    var server = http.createServer().listen(process.env.PORT)
    this.app.start(server)
    
    console.log("Express server listening on port " + process.env.PORT)
  }
}