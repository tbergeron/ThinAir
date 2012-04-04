var express = require("express")

module.exports = {
  start: function (app) {
    //app.dynamicLocals({
    //  messages      : require('express-messages-bootstrap'),
    //  session       : function (req) { return req.session }
    //})

    app.configure(function(){
      app.set('views', __dirname + '/views')
      app.set('view engine', 'ejs')
      app.use(express.favicon())
      app.use(express.logger('dev'))
      app.use(express.static(__dirname + '/../public'))
      app.use(express.bodyParser())
      app.use(express.methodOverride())
//      app.use(express.cookieParser({ secret: 'secretword' }))
//      app.use(express.session({ secret: 'secretword' }))
      app.use(app.router)
    });
  
    app.configure('development', function(){
      app.use(express.errorHandler())
    });
  }
}