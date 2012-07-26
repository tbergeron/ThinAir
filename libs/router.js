var static = require('node-static'),
    router = new require('routes').Router(),
    routil = require('routil'),
    isDefined = require('./thinair').isDefined,
    pd = require('pd'),
    qsObjects = require('qs-objects');


// change the path if it's called from tests
if (process.env.CALLED_FROM_TESTS) {
    var publicPath = '../../public';
} else {
    var publicPath = './public';
}

var file = new(static.Server)(publicPath);

var Router = {
    // registers a route
    add: function(uri, fn) { 
        router.addRoute(uri, fn);
    },

    // match a route and execute its related function
    match: function(req, res) {
        // matching a route
        var route = router.match(req.url);

        console.warn('route', route);

        // if a route is matched, executing the reponse function
        if (route) {
            try {
                if (req.method == 'POST') {
                    // Converting query string to objects
                    var buffer = '';

                    req.on('data', function(chunk) {
                        buffer += chunk.toString();
                    });

                    req.on('end', function() {
                        var body = qsObjects(buffer);

                        // merging body inside req
                        req = pd.extend(Object.create(req), { body: body });

                        route.fn(req, res, route.params, route.splats);
                    });
                } else {
                    route.fn(req, res, route.params, route.splats);
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

        return function(req, res, params, splats) {
            var controllerObject = that.controllers[controller];

            // TODOTB: Re-implement this.
            // if (isDefined(parameters)) {
            //     if (isDefined(parameters.checkIfAuthorized)) {
            //         sessionsHelper.checkIfAuthorized(req, res);
            //     }
            // }

            return controllerObject[action](req, res, params, splats);
        };
    }
};

module.exports = Router;