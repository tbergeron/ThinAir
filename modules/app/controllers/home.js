var createController = require("../../libs/controllers").createController;

var HomeController = createController({
  index: function(req, res) {
    res.render("index", { title: "ThinAir" });
  },

  error: function(req, res) {
    res.render("error", { title: "Error" });
  }
});

module.exports = HomeController;