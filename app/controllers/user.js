module.exports = {
  // POST: /users/login
  login: function(req, res) {
    var username = req.body.username
    var password = req.body.password
  
    //db.users.findOne({ username: username, password: password }, function(err, user) {
    //  if(err || !user) {
    //    req.flash('error', '<strong>Oh no! Something went wrong.</strong> We are unable to find this user. Maybe your password is wrong? Please try again.')
    //  } else {
    //    req.session.is_logged = 1
    //    req.session.username = username
    //    req.flash('success', 'Welcome back ' + username + '!')
    //  }
      res.redirect('/')
    })
  }

  // GET: /users/logout
  logout: function(req, res) {
    req.session.is_logged = 0
    req.session.username = null
    
    res.redirect('/')
  }
}