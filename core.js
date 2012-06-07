require("./config");

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