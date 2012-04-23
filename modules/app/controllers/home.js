var HomeController = {
  index: function(req, res) {
    return res.render("index", { title: "ThinAir" });
  }
};

module.exports = HomeController;