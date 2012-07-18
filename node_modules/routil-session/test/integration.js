var http = require("http")
    , test = require("testling")
    , request = require("request")
    , routilSession = require("..")
    , session = routilSession()
    , getSession = session.getSession
    , createSession = session.createSession
    , destroySession = session.destroySession
    , getSessionData = session.getSessionData
    , partial = require("ap").partial

var handlers = {
    "/getSession": function (req, res) {
        getSession(req, function (err, data) {
            res.end(data && data.foo)
        })
    }
    , "/createSession": function (req, res) {
        createSession(res, {
            foo: "bar"
        }, function (err) {
            res.end()
        })
    }
    , "/destroySession": function (req, res) {
        destroySession(req, res, function (err) {
            res.end()
        })
    }
    , "/getSessionData": function (req, res) {
        getSessionData(req, res, function (err, data) {
            res.end(data.foo)
        })
    }
}

var server = http.createServer(handleRequest).listen(3002, startTests)

var timer = setTimeout(killServer, 5000)

function handleRequest(req, res) {
    if (req.url in handlers) {
        handlers[req.url](req, res)
    }
}

function startTests() {
    test("getting session data redirects to /session", function (t) {
        makeRequest("/getSessionData", function (err, res, body) {
            t.equal(err, null, "error is not null")
            t.equal(res.statusCode, 302, "statusCode is incorrrect")
            t.equal(res.headers.location, "/session",
                "location header is incorrect")
            t.ok(res.body.indexOf("/session") > -1,
                "redirect message is incorrect")

            t.end()
        })
    })

    test("can create a session", function (t) {
        makeRequest("/createSession", function (err, res) {
            t.equal(err, null, "error is not null")
            t.ok(res.headers["set-cookie"], "session id not set in cookie")

            makeRequest("/getSession", partial(assertCorrectSessionData, t))
        })
    })

    test("can get session data without redirect", function (t) {
        makeRequest("/getSessionData", partial(assertCorrectSessionData, t))
    })

    test("can delete session data", function (t) {
        makeRequest("/destroySession", function (err, res, body) {
            t.equal(err, null, "error is not null")
            t.ok(res.headers["set-cookie"], "cookie has been set")

            makeRequest("/getSession", function (err, res, body) {
                t.equal(body, undefined, "body is not undefined")

                t.end()
            })
        })
    })

    .on("end", killServer)
}

function assertCorrectSessionData(t, err, res, body) {
    t.equal(err, null, "error is not null")
    t.equal(res.statusCode, 200, "statusCode is not 200")
    t.equal(body, "bar", "session data was not stored")

    t.end()
}

function makeRequest(uri, callback) {
    request({
        followRedirect: false
        , uri: "http://localhost:3002" + uri
    }, callback)
}

function killServer() {
    server.close()
    clearTimeout(timer)
}