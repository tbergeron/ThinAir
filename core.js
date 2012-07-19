require("./config");

// if using DEV use console-trace for console.log by default
if (process.env['ENVIRONMENT'] == 'DEV') {
    require('console-trace')({ always: true });
}

var path = require('path');

require("ncore")({
    uri: __dirname,
    dependencyMapper: {
        jsonUri: path.join(__dirname, "libs", "dependency.json")
    },
    moduleLoader: {
        skip: /test|public|node_modules|bin/
    }
});