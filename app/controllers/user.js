var helpers = require('../../libs/helpers');

var UserController = {
	// properties
	Users: null,

	// constructor
	initialize: function() {
		this.Users = this.repositories.Users;
	},

	// POST: /users/login
	login: function(req, res) {
		this.initialize();

		var username = req.body.username;
		var password = req.body.password;

		this.Users.byUsernameAndPassword(username, password, function(user) {
			if (!user) {
				helpers.flash(req, 'error', 'We are unable to find this user or maybe your password is wrong? Please try again.');
			} else {
				req.session.is_logged = true;
				req.session.username = username;
				helpers.flash(req, 'success', 'Welcome back ' + username + '!');
			}
			res.redirect('/');
		});
	},

	// GET: /users/logout
	logout: function(req, res) {
		req.session.is_logged = null;
		req.session.username = null;

		res.redirect('/');
	}

};

module.exports = UserController;