module.exports = {
  registerRoutes: function(router) {
    var getAction = router.getAction;

    router.add("/", getAction("home", "index"));
  }
};