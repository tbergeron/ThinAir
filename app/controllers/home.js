var createController = require("../../libs/controllers").createController;

var HomeController = createController({
    // /projects
    index: function(req, res) {
        // res.render("index", { title: "ThinAir" });
    },

    // every 404
    error: function(req, res) {
        // res.render("error", { title: "Error" });
    }
});

module.exports = HomeController;