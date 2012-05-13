var http = require("http");

module.exports = {
  init: function() {
    // if ran from c9, use its port
    process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : 3000;

    // starts the server
    this.app.start(http.createServer().listen(process.env.PORT));

    return console.log("Express server listening on port " + process.env.PORT);
  }
};