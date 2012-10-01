process.env.CALLED_FROM_TESTS = true;

var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("../../index"),
    server = require("../../libs/server");

var startTests = function(request, done) {
    test('route get 200', function (t) {
        request("/routes/test", function (err, res, body) {
            t.equal(err, null, "error should be undefined");
            t.equal(res.statusCode, 200, "status code should be 200");
            t.equal(body, 'hello world', "body should be 'hello world'");
            t.end();
        });
    });

    test('route get 200 template', function (t) {
        request("/routes/test-template", function (err, res, body) {
            t.equal(err, null, "error should be undefined");
            t.equal(res.statusCode, 200, "status code should be 200");
            t.equal(body.length, 12, "body should be have a length of 12 characters");
            t.end();
        });
    });

    test('route get 200 static file', function (t) {
        request("/test.txt", function (err, res, body) {
            console.warn('body', body);
            t.equal(err, null, "error should be undefined");
            t.equal(res.statusCode, 200, "status code should be 200");
            t.equal(body, 'static file delivery test\n', "body should equal 'static file delivery test'");
            t.end();
        });
    });

    test('route get 404', function (t) {
        request("/routes/404", function (err, res, body) {
            t.equal(err, null, "error should be undefined");
            t.equal(res.statusCode, 404, "status code should be 404");
            t.end();
        });
    })

    .on('end', function () {
        setTimeout(function (){
            process.exit(0);
        }, 1000);
    });
};

nCoreStart.start(function() {
    testServer(server, startTests);
});