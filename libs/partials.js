var fs = require("fs");

var Partials = {
  // registers any partial contained in app/views/partials
  registerPartials: function(hbs) {
    // read a partial's content
    readPartials = function(err, files) {
      return files.forEach(loadPartial);
    };

    // register the hbs partial
    loadPartial = function(file) {
      var partialName = file.replace(".html", "");
      return hbs.registerPartial(partialName, fs.readFileSync(__dirname + "/../app/views/partials/" + file, "UTF-8"));
    };

    return fs.readdir(__dirname + "/../app/views/partials", readPartials);
  }
};

module.exports = Partials;