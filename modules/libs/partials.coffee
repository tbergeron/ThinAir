fs = require("fs")

Partials = registerPartials: (hbs) ->
  readPartials = (err, files) ->
    files.forEach loadPartial

  loadPartial = (file) ->
    partialName = file.replace(".html", "")
    hbs.registerPartial partialName, fs.readFileSync(__dirname + "/../app/views/partials/" + file, "UTF-8")

  fs.readdir __dirname + "/../app/views/partials", readPartials

module.exports = Partials