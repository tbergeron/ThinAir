var express = require('express'),
		hbs			= require('handlebars'),
		helpers	= require('./helpers');

module.exports = {
	start: function start(server) {
		var app = express();

		this.configure.start(app);

		this.routes.registerRoutes(app);

		this.partials.registerPartials(hbs);

		helpers.registerHandlebarsHelpers(hbs);

		server.on('request', app);
	}
};