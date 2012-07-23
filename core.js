require("./config");

var path = require('path'),
    server = require('./libs/server');

// if using DEV use console-trace for console.log by default
if (process.env.ENVIRONMENT === 'DEV') {
    require('console-trace')({ always: true });
}

var nCoreStart = function(callback) {
    require("ncore")({
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
    nCoreStart(function(){
        server.startServer();
    });
}

module.exports = nCoreStart;