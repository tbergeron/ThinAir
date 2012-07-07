module.exports = function(router, getAction) {
    router.add("/", getAction("home", "index"));
};