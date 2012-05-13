require("./db");

require("ncore/modules/core")({
    uri: require("path").join(__dirname),
    dependencyMapper: {
        jsonUri: require("path").join(__dirname, "libs", "dependency.json"),
        uri: __dirname
    }
});