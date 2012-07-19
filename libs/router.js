var pd = require('pd'),
    router = new require('routes').Router(),
    routil = require('routil'),
    Session = require("routil-session"),
    session = Session(),
    isDefined = require('./helpers/objects').isDefined;

var Router = {
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
                route.fn(req, res, route.params, route.splats);
            } catch (e) {
                // If something wrong happens, shoot the error stack.
                if (process.env['ENVIRONMENT'] == 'DEV') {
                    // TODOTB: Maybe make some kind of custom page for errors.
                    routil.sendHtml(res, '<pre>' + e.stack + '</pre>');
                } else {
                    routil.errorPage(req, res, 500);
                }
            }
        } else {
            routil.errorPage(req, res, 404);
        }
    },

    // gets a requested action, and handles its parameters
    getAction: function(controller, action, parameters) {
        var that = this;

        return function(req, res) {
            var controllerObject = that.controllers[controller];

            // TODOTB: Re-implement this.
            // if (isDefined(parameters)) {
            //     if (isDefined(parameters.checkIfAuthorized)) {
            //         sessionsHelper.checkIfAuthorized(req, res);
            //     }
            // }

            return controllerObject[action](req, res);
        };
    }
};

module.exports = Router;