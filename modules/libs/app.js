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

		Object.keys(this.controllers).forEach(function (name) {
			var controller = this.controllers[name];

			if (typeof controller.initialize === 'function') {
				controller.initialize();
			}
		}, this);

		server.on('request', app);
	}
};