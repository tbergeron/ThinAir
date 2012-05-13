require("./db");
//require("ncore/modules/moduleLoader").core(require("path").join(__dirname, "modules"));

require("ncore/modules/core")({
    uri: require("path").join(__dirname, "app"),
    dependencyMapper: {
        jsonUri: require("path").join(__dirname, "dependency.json")
    }
});