require("coffee-script"); 
var http = require('http');

module.exports = {
  init: function init() {
    process.env.PORT = process.env.C9_PORT;

    var server = http.createServer().listen(process.env.PORT);
    this.app.start(server);

    console.log('Express server listening on port ' + process.env.PORT);
  }
};