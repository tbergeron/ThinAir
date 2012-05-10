var pd = require("pd");

var Controllers = {
  // creates a basic controller
  createController: function(content) {
        return pd.extend(Object.create({}), content, {
        });
  }
}

module.exports = Controllers;