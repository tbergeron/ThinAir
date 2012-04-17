var http = require('http');

module.exports = {
  init: function init() {
    //process.env.PORT = 3000;

    var server = http.createServer().listen(process.env.C9_PORT);
    this.app.start(server);

    console.log('Express server listening on port ' + process.env.PORT);
  }
};