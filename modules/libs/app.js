var express = require("express"),
    hbs     = require("handlebars");

module.exports = {
  start: function(server) {
    var app = express();

    this.configure.start(app);
    this.routes.registerRoutes(app);
    this.partials.registerPartials(hbs);

	io.sockets.on('connection', function (socket) {
		socket.on('getView', function (name, callback) {
            
			callback("yo manne");
		});
	});

    server.on("request", app);
  }
};