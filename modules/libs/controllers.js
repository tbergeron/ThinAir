var helpers = require("./helpers"),
    pd = require("pd");

var Controllers = {
  createController: function(content) {
        return pd.extend(Object.create({}), content, {
        });
  }
}

module.exports = Controllers;