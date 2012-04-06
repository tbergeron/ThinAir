var UserController = {
  // properties
  Users: null,
  
  // constructor
  initialize: function() {
    this.Users = this.repositories.Users
  },
  
  // POST: /users/login
  login: function(req, res) {
    this.initialize()
    
    var username = req.body.username
    var password = req.body.password
    
    this.Users.byUsernameAndPassword(username, password, function(err, user) {
      // todo: find a way to avoid this which is fucking ugly
      var helpers = require('../helpers')
      
      if(err || !user) {
       helpers.flash(req, 'error', '<strong>Oh no! Something went wrong.</strong> We are unable to find this user. Maybe your password is wrong? Please try again.')
      } else {
        req.session.is_logged = true
        req.session.username = username
        helpers.flash(req, 'success', 'Welcome back ' + username + '!')
      }
      res.redirect('/')
    })
  },

  // GET: /users/logout
  logout: function(req, res) {
    req.session.is_logged = null
    req.session.username = null
    
    res.redirect('/')
  }
  
}

module.exports = UserController