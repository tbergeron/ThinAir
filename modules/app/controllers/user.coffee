helpers = require("../../libs/helpers")
UserController =
  Users: null
  initialize: (req, res) ->
    @Users = @repositories.Users

  login: (req, res) ->
    username = req.body.username
    password = req.body.password
    that = this
    @Users.byUsernameAndPassword username, password, (user) ->
      unless user
        that.messages.addMessage req, "error", "We are unable to find this user or maybe your password is wrong? Please try again."
      else
        req.session.is_logged = true
        req.session.username = username
        that.messages.addMessage req, "success", "Welcome back " + username + "!"
      res.redirect "/"

  logout: (req, res) ->
    req.session.is_logged = null
    req.session.username = null
    res.redirect "/"

module.exports = UserController