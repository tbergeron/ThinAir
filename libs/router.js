var static = require('node-static'),
    router = new require('routes').Router(),
    routil = require('routil'),
    isDefined = require('./thinair').isDefined,
    pd = require('pd'),
    qsObjects = require('qs-objects'),
    formidable = require('formidable'),
    path = require('path');

var publicPath = (process.env.CALLED_FROM_TESTS) ? path.join(__dirname, '../public') : path.join(__dirname, '../../../public');

var file = new(static.Server)(publicPath);

var Router = {
    registerRoutes: function() {
        var routesPath = (process.env.CALLED_FROM_TESTS) ? path.join(__dirname, '../app/routes.json') : path.join(__dirname, '../../../app/routes.json');
        var routes = require(routesPath);

        for (var uri in routes) {
            // todo: add URI parameters
            this.add(uri, this.getAction(routes[uri].controller, routes[uri].action));
        }
    },

    // registers a route
    add: function(uri, fn) { 
        router.addRoute(uri, fn);
    },

    // match a route and execute its related function
    match: function(req, res) {
        // matching a route
        var route = router.match(req.url);

        // if a route is matched, executing the reponse function
        if (route) {
            try {
                // Setting user_is_logged so it can be used app-wide
                route.params.userIsLogged = (req.session.userIsLogged) ? true : false;

                if (req.method == 'POST') {
                    var form = new formidable.IncomingForm(),
                        thatReq = req,
                        thatRes = res;

                    form.parse(req, function(err, fields, files) {
                        route.params.post = qsObjects(fields);
                        route.params.files = files;

                        route.fn(thatReq, thatRes, route.params);
                    });
                } else {
                    route.fn(req, res, route.params);
                }
            } catch (e) {
                // If something wrong happens, shoot the error stack.
                if (process.env.ENVIRONMENT === 'DEV') {
                    // TODOTB: Maybe make some kind of custom page for errors.
                    routil.sendHtml(res, '<pre>' + e.stack + '</pre>');
                } else {
                    routil.errorPage(req, res, 500);
                }
            }
        } else {
            var thatReq = req,
                thatRes = res;

            // if no route is matched, try to find a static file to serve
            file.serve(req, res, function (e, res) {
                // If the file wasn't found, send 404
                if (e && (e.status === 404)) {
                    routil.errorPage(thatReq, thatRes, 404);
                }
            });
        }
    },

    // gets a requested action, and handles its parameters
    getAction: function(controller, action, parameters) {
        var that = this;

        return function(req, res, params) {
            var controllerObject = that.controllers[controller];
            controllerObject[action](req, res, params);
        };
    }
};

module.exports = Router;