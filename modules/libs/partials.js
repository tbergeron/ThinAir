var fs = require('fs');

var Partials = {
	registerPartials: function(hbs) {
		fs.readdir(__dirname + '/../app/views/partials', readPartials);

		function readPartials(err, files) {
			files.forEach(loadPartial);
		}

		function loadPartial(file) {
			var partialName = file.replace('.html', '');
			hbs.registerPartial(partialName, fs.readFileSync(__dirname + '/../app/views/partials/' + file, 'UTF-8'));
		}
	}
};

module.exports = Partials;