var express = require("express"),
    cons    = require('consolidate')

module.exports = {
  start: function (app) {
    var helpers = this.helpers
    
    app.locals.use(function(req, res) {
      res.locals.session = req.session
      res.locals.messages = helpers.get_flash(req)
    })

    app.configure(function(){
      app.engine('html', cons.handlebars);
      app.set('view engine', 'html');
      app.set('views', __dirname + '/views')
      
      app.use(express.favicon())
      app.use(express.logger('dev'))
      app.use(express.static(__dirname + '/../public'))
      app.use(express.bodyParser())
      app.use(express.methodOverride())
      app.use(express.cookieParser("secret"))
      app.use(express.session({ secret: 'keyboard cat' }))
      app.use(app.router)
    });
  
    app.configure('development', function(){
      app.use(express.errorHandler())
    });
  }
}