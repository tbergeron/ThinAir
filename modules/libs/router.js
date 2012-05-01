var helpers = require('./helpers');

var Router = {
  getAction: function(controller, action, parameters) {
    return function(req, res) {
      console.log(parameters);
            console.log('zouzoupuce');

      if (parameters != undefined) {

        if (parameters.checkIfAuthorized != undefined) {

          if (parameters.checkIfAuthorized) {
            helpers.checkIfAuthorized(req, res);
          }        
        }
      }

      return controller[action](req, res);
    };
  }
};

module.exports = Router;