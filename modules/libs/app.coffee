express = require("express")
hbs = require("handlebars")
helpers = require("./helpers")

module.exports = start: start = (server) ->
  app = express()

  @configure.start app
  @routes.registerRoutes app
  @partials.registerPartials hbs

  server.on "request", app