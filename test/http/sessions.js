process.env.CALLED_FROM_TESTS = true;

var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("../../core"),
    server = require("../../libs/server")

var startTests = function(request, done) {
    test('session get', function (t) {
        request("/sessions/get", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session create', function (t) {
        request("/sessions/create", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session get', function (t) {
        request('/sessions/get', function (err, res, body) {
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

nCoreStart(function() {
    testServer(server, startTests)
})