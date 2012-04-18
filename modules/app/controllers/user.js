var helpers = require('../../libs/helpers');

var UserController = {
  Users: null,

  initialize: function(req, res) {
    this.Users = this.repositories.Users;
  },

  // POST: /users/login
  login: function(req, res) {
    var username = req.body.username,
        password = req.body.password,
        that     = this;

    this.Users.byUsernameAndPassword(username, password, function(user) {
      if (!user) {
        that.messages.addMessage(req, 'error', 'We are unable to find this user or maybe your password is wrong? Please try again.');
      } else {
        req.session.is_logged = true;
        req.session.username = username;
        that.messages.addMessage(req, 'success', 'Welcome back ' + username + '!');
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