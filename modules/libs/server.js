var http = require("http");

module.exports = {
  init: function() {
    // default port
    process.env.PORT = 3000;

    // starts the server
    this.app.start(http.createServer().listen(process.env.PORT));

    return console.log("Express server listening on port " + process.env.PORT);
  }
};