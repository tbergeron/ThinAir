// Generated by CoffeeScript 1.3.1
(function() {
  var http, init;

  http = require("http");

  module.exports = {
    init: init = function() {
      var server;
      process.env.PORT = 3000;
      server = http.createServer().listen(process.env.PORT);
      this.app.start(server);
      return console.log("Express server listening on port " + process.env.PORT);
    }
  };

}).call(this);