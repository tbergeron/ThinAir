var test = require("testling"), 
    testServer = require("test-server"),
    request = require('request'),
    nCoreStart = require("../../core"),
    server = require("../../libs/server");

nCoreStart(testServer(server, startTests));

function startTests() {
    test('session get', function (t) {
        makeRequest("/get", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session create', function (t) {
        makeRequest("/create", function (err, res, body) {
            t.equal(err, null, "error should be undefined")
            t.equal(body, undefined, "body should be undefined")
            t.end()
        })
    })

    test('session get', function (t) {
        makeRequest('/get', function (err, res, body) {
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

// TODOTB: use test-server instead.
function makeRequest(opts, cb) {
    if (typeof opts === 'string') {
        opts = "http://localhost:3000" + opts
    } else {
        opts.uri = "http://localhost:3000" + opts.uri
    }
    request(opts, cb)
}