module.exports = {
  registerRoutes: function() {
    var router = this.router,
        getAction = this.router.getAction;

    router.add("/", getAction("home", "index"));
  }
};