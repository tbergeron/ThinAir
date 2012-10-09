process.env.CALLED_FROM_TESTS = true;

var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("./index"),
    server = require("./libs/server");

nCoreStart.start(function() {
    testServer(server, function() {
        console.warn('Started test server on port 3002');
    });
});