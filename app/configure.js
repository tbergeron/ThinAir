var express = require("express")

module.exports = {
  start: function (app) {
    app.configure(function(){
      app.set('views', __dirname + '/../views')
      app.set('view engine', 'ejs')
      app.use(express.favicon())
      app.use(express.logger('dev'))
      app.use(express.static(__dirname + '/../public'))
      app.use(express.bodyParser())
      app.use(express.methodOverride())
      app.use(app.router)
    });
  
    app.configure('development', function(){
      app.use(express.errorHandler())
    });
  }
}