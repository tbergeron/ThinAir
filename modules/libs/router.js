var helpers   = require('./helpers'),
    isDefined = helpers.isDefined;

var Router = {
  // gets a requested action, and handles its parameters
  getAction: function(controller, action, parameters) {
    return function(req, res) {
      if (isDefined(parameters)) {
        if (isDefined(parameters.checkIfAuthorized)) {
            helpers.checkIfAuthorized(req, res);
        }
      }

      return controller[action](req, res);
    };
  }
};

module.exports = Router;