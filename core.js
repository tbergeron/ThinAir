require("./config");

// if using DEV use console-trace for console.log by default
if (process.env.ENVIRONMENT === 'DEV') {
    require('console-trace')({ always: true });
}

var path = require('path');
module.exports = startNcore

function startNcore(callback) {
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
    startNcore(noop)
}

function noop() {}