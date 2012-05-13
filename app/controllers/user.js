var createController = require("../../libs/controllers").createController;

var UserController = createController({
  Users: null,

  setup: function(req, res) {
    this.Users = this.repositories.Users;
  },

  // /user/login
  login: function(req, res) {
    var that = this,
        username = req.body.username,
        password = req.body.password;

    this.Users.getByUsernameAndPassword(username, password, function(user) {
      if (!user) {
        that.messages.addMessage(req, "error", "We are unable to find this user or maybe your password is wrong? Please try again.");

      } else {
        req.session.is_logged = true;
        req.session.username = username;
        that.messages.addMessage(req, "success", "Welcome back " + username + "!");
      }

      res.redirect("/");
    });
  },

  // /user/logout
  logout: function(req, res) {
    req.session.is_logged = null;
    req.session.username = null;

    res.redirect("/");
  }
});

module.exports = UserController;