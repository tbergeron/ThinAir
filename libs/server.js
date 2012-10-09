var http = require('http'),
    router = require('./router'),
    connect = require('connect');

var requestHandler = function(req, res) {
    // sending request to router
    router.match(req, res);
};

requestHandler.startServer = function() {
    // Sessions
    var sessionOptions = {
        secret: (process.env.SESSIONS_SECRET) ? process.env.SESSIONS_SECRET : 'hello world'
    };

    if (process.env.STORE_SESSIONS_IN_MONGODB) {
        var MongoStore = require('connect-mongodb');

        var mongoStoreOptions = {
            url: 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE
        };

        sessionOptions.store = new MongoStore(mongoStoreOptions, function(err) {
            if (err) console.log('err', err);
        });
    }

    // if ran from c9, use its port
    process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

    // starts the server
    var server = connect()
        .use(connect.favicon())
        .use(connect.cookieParser())
        .use(connect.session(sessionOptions))
        .use(requestHandler)
        .listen(process.env.PORT, function() {
            console.log('ThinAir server is started and listening on port ' + process.env.PORT);
        });

    return server;
};

module.exports = requestHandler;