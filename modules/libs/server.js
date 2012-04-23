var http = require("http");

module.exports = {
  init: function() {
    process.env.PORT = 3000;

    var server = http.createServer().listen(process.env.PORT);

    this.app.start(server);

    return console.log("Express server listening on port " + process.env.PORT);
  }
};