HomeController =
  index: (req, res) ->
    res.render "index",
      title: "ThinAir"

module.exports = HomeController