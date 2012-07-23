var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("../../core"),
    server = require("../../libs/server");

var startTests = function(request, done) {
    test('session get', function (t) {
        request("/get", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session create', function (t) {
        request("/create", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session get', function (t) {
        request('/get', function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.type(body, "string", "body should be a string")
            t.end()
        })
    })

    .on('end', function () {
        setTimeout(function (){
            process.exit(0)
        }, 1000)
    })
}

nCoreStart(testServer(server, startTests));