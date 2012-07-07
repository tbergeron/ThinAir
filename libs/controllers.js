var pd = require('pd'),
    routil = require('routil');

var Controllers = {
    // creates a basic controller
    createController: function(content) {
        return pd.extend(Object.create({}), routil, content);
    }
}

module.exports = Controllers;