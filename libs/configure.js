var express      = require("express"),
    cons         = require("consolidate"),
    MongoStore   = require('connect-mongo')(express);

module.exports = {
  start: function(app) {
    var that = this;

    // locals are objects that can be used within views.
    app.locals.use(function(req, res) {
      res.locals.session = req.session;
      return res.locals.messages = that.messages.getMessages(req);
    });

    app.configure(function() {
      app.engine("html", cons.handlebars);
      app.set("view engine", "html");
      app.set("views", __dirname + "/../app/views");
      app.use(express.favicon());
      app.use(express.logger("dev"));
      app.use(express["static"](__dirname + "/../public"));
      app.use(express.bodyParser());
      app.use(express.methodOverride());

      // sessions are stored inside the database
      app.use(express.cookieParser("secret"));
      app.use(express.session({
        secret: "keyboard cat",
        maxAge: new Date(Date.now() + 3600000),
        store:  new MongoStore({
          db: process.env['MONGODB_DATABASE'], 
          host: process.env['MONGODB_HOST'],
          port: process.env['MONGODB_PORT'],
          username: process.env['MONGODB_USER'],
          password: process.env['MONGODB_PASSWORD']
        })
      }));

      app.use(app.router);
    });

    app.configure("development", function() {
      app.use(express.errorHandler());
    });

  }
};