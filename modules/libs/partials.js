var fs = require("fs");

var Partials = {
  registerPartials: function(hbs) {
    readPartials = function(err, files) {
      return files.forEach(loadPartial);
    };

    loadPartial = function(file) {
      var partialName = file.replace(".html", "");
      return hbs.registerPartial(partialName, fs.readFileSync(__dirname + "/../app/views/partials/" + file, "UTF-8"));
    };

    return fs.readdir(__dirname + "/../app/views/partials", readPartials);
  }
};

module.exports = Partials;