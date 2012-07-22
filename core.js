require("./config");

var path = require('path');

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

if (require.main === module) {
    nCoreStart(noop);
}

function noop() {}

module.exports = nCoreStart;