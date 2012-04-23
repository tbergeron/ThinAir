var Router = {
  getAction: function(controller, action) {
    return function(req, res) {
      if (typeof controller.initialize === "function") {
        controller.initialize(req, res);
      }

      return controller[action](req, res);
    };
  }
};

module.exports = Router;