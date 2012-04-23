// Generated by CoffeeScript 1.3.1
(function() {
  var Partials, fs;

  fs = require("fs");

  Partials = {
    registerPartials: function(hbs) {
      var loadPartial, readPartials;
      readPartials = function(err, files) {
        return files.forEach(loadPartial);
      };
      loadPartial = function(file) {
        var partialName;
        partialName = file.replace(".html", "");
        return hbs.registerPartial(partialName, fs.readFileSync(__dirname + "/../app/views/partials/" + file, "UTF-8"));
      };
      return fs.readdir(__dirname + "/../app/views/partials", readPartials);
    }
  };

  module.exports = Partials;

}).call(this);
