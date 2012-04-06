var Helpers = {
  check_if_authorized: function(req, res) {
    if (req.session.is_logged) {
      return true
    } else {
      //req.flash('error', 'You need to be logged in to access this page.')
      res.redirect('/')
    }
  },
  
  is_get: function(req) {
    return (req.route.method == 'get') ? true : false
  },
  
  is_post: function(req) {
    return (req.route.method == 'post') ? true : false
  },

  slugify: function(str) {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
  
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
    var to   = "aaaaeeeeiiiioooouuuunc------"
    
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  
    return str
  },
  
  flash: function(req, type, message) {
    if (req.session.messages == undefined) {
      req.session.messages = []
    }
    
    if ((type != undefined) && (message != undefined)) {
      var message = { type: type, message: message }
      req.session.messages.push(message)
    }
    
    return req.session.messages
  },
  
  get_flash: function(req) {
    if (req.session.messages != undefined) {

      var messages = req.session.messages
      
      // cleaning messages
      req.session.messages = []
      
      return messages
    }
  }
  
}

module.exports = Helpers