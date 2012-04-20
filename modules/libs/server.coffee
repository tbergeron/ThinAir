http = require("http")

module.exports = init: init = ->
  process.env.PORT = 3000
  server = http.createServer().listen(process.env.PORT)
  @app.start server
  console.log "Express server listening on port " + process.env.PORT