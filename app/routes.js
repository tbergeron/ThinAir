module.exports = {
  registerRoutes: function() {
    var router = this.router,
        getAction = this.router.getAction,
        home      = this.controllers.home;

    router.add("/", getAction(home, "index"));
  }
};