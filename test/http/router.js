var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("../../core"),
    server = require("../../libs/server")

var startTests = function(request, done) {
    test('route get', function (t) {
        request("/routes/test", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(res.statusCode, 200, "status code should be 200")
            t.equal(body, 'hello world', "body should be 'hello world'")
            t.end()
        })
    })

    test('route get', function (t) {
        request("/routes/404", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(res.statusCode, 404, "status code should be 404")
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
});