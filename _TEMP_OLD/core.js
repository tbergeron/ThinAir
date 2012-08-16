require("./config");

var path = require('path'),
    server = require('./libs/server'),
    sockets = require('./libs/sockets'),
    nCore = require('./node_modules/ncore/modules/core');

// if using DEV use console-trace for console.log by default
if (process.env.ENVIRONMENT === 'DEV') {
    require('console-trace')({ always: true });
}

var nCoreStart = function(callback) {
    nCore({
        uri: __dirname,
        dependencyMapper: {
            jsonUri: path.join(__dirname, "libs", "dependency.json")
        },
        moduleLoader: {
            skip: /test|public|node_modules|bin/
        }
    }, callback);
}

// if it's called by node
if (require.main === module) {
    nCoreStart(function(err){
        if (err) {
            console.error('Error starting nCore:', err);
            process.exit(0);
        } else {
            var serverInstance = server.startServer();

            // socket.io initialization
            sockets.initialize(serverInstance);
        }
    });
}

module.exports = nCoreStart;