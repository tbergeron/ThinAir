var router = new require('routes').Router(),
    sessions = require('./helpers/sessions'),
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

        // if one is matched, executing the reponse function
        if (route) {
            route.fn(req, res, route.params, route.splats);
        }
    },

    // gets a requested action, and handles its parameters
    getAction: function(controller, action, parameters) {
        var that = this;

        return function(req, res) {
            var controllerObject = that.controllers[controller];

            if (isDefined(parameters)) {
                if (isDefined(parameters.checkIfAuthorized)) {
                    sessions.checkIfAuthorized(req, res);
                }
            }

            return controllerObject[action](req, res);
        };
    }
};

module.exports = Router;