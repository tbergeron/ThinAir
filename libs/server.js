var http = require('http'),
    router = require('./router'),
    connect = require('connect');

var requestHandler = function(req, res) {
    // sending request to router
    router.match(req, res);
};

requestHandler.startServer = function() {
    // Sessions
    var sessionSettings = {
        secret: 'foo'
    };

    if (process.env.STORE_SESSIONS_IN_MONGODB) {
        var Db = require('mongodb').Db,
            Server = require('mongodb').Server,
            server_config = new Server(process.env.MONGODB_HOST, process.env.MONGODB_PORT, { auto_reconnect: true, native_parser: true }),
            db = new Db(process.env.MONGODB_DATABASE, server_config, {}),
            mongoStore = require('connect-mongodb');

        sessionSettings.store = new mongoStore({ db: db });
    }

    // if ran from c9, use its port
    process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

    // starts the server
    var server = connect()
        .use(connect.favicon())
        .use(connect.cookieParser())
        .use(connect.session(sessionSettings))
        .use(requestHandler)
        .listen(process.env.PORT, function() {
            console.log('ThinAir server is started and listening on port ' + process.env.PORT);
        });

    return server;
};

module.exports = requestHandler;