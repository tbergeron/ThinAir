var test = require("testling"), 
    request = require('request'),
    core = require("../../core")

core(startTests)

function startTests() {
    test('session get', function (t) {
        makeRequest("/get", function (err, res, body) {
            console.error('body', body)

            t.end()
        })
    })

    test('session create', function (t) {
        makeRequest("/create", function (err, res, body) {
            console.error('body', body)

            t.end()
        })
    })

    test('session get', function (t) {
        makeRequest('/get', function (err, res, body) {
            console.error('error', err)
            console.error('body', body)

            t.end()
        })
    })

    .on('end', function () {
        setTimeout(function (){
            process.exit(0)
        }, 1000)
    })
}

function makeRequest(opts, cb) {
    if (typeof opts === 'string') {
        opts = "https://localhost:3000" + opts
    } else {
        opts.uri = "http://localhost:3000" + opts.uri
    }
    request(opts, cb)
}