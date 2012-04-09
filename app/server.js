var http = require('http');

module.exports = {
	init: function init() {

		// remove for c9 dev
		process.env.PORT = 3000;

		var server = http.createServer().listen(process.env.PORT);
		this.app.start(server);

		console.t.log('Express server listening on port ' + process.env.PORT);
	}
};