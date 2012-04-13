var Helpers = {
	checkIfAuthorized: function(req, res) {
		if (req.session.is_logged) {
			return true;
		} else {
			this.flash(req, 'error', 'You need to be logged in to access this page.');
			res.redirect('/');
		}
	},

	isGet: function(req) {
		return (req.route.method == 'get') ? true : false;
	},

	isPost: function(req) {
		return (req.route.method == 'post') ? true : false;
	},

	slugify: function(str) {
		str = str.replace(/^\s+|\s+$/g, '');
		str = str.toLowerCase();

		var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
		var to = 'aaaaeeeeiiiioooouuuunc------';

		for (var i = 0, l = from.length; i < l; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

		return str;
	},

	flash: function(req, type, message) {
		if (req.session.messages === undefined) {
			req.session.messages = [];
		}

		if ((type !== undefined) && (message !== undefined)) {
			var messageObject = {
				type: type,
				message: message
			};
			req.session.messages.push(messageObject);
		}

		return req.session.messages;
	},

	getFlash: function(req) {
		if (req.session.messages !== undefined) {
			// cleaning messages
			req.session.messages = [];

			return req.session.messages;
		}
	},

	// todo: it would be cool to eventually do something with this
	registerHandlebarsHelpers: function(hbs) {
		// hbs.registerHelper('fullName', function(person) {
		//   return person.firstName + " " + person.lastName;
		// });
	}

};

module.exports = Helpers;