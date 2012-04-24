var HomeController = {
  index: function(req, res) {
    res.render("index", { title: "ThinAir" });
  },

  error: function(req, res) {
    res.render("error", { title: "Error" });
  }
};

module.exports = HomeController;