var http = require("http"),
    express = require("express"),
    hbs     = require("handlebars"),
    fs      = require("fs");

module.exports = {
  init: function() {
    // if ran from c9, use its port
    process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

    // initialize the app
    var app = express();

    this.configure.start(app);
    this.routes.registerRoutes(app);
    this.partials.registerPartials(hbs);

    // starts the server
    var server = http.createServer();
    server.listen(process.env.PORT)

    server.on("request", app);

    // socket.io initialization
    this.sockets.initialize(server);

    return console.log("Express server listening on port " + process.env.PORT);
  }
};