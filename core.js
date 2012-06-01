require("./config");

var path = require('path');

require("ncore/modules/core")({
    uri: __dirname,
    dependencyMapper: {
        jsonUri: path.join(__dirname, "libs", "dependency.json"),
        uri: __dirname
    },
    moduleLoader: {
      skip: /test|public|node_modules|bin/
    }
});