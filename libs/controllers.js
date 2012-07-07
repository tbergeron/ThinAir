var pd = require('pd'),
    routil = require('routil');

var Controllers = {
    // creates a basic controller
    createController: function(content) {
        return pd.extend(Object.create({}), routil, content, {
            sendTemplate: function(req, res, name, params) {
                // preventing templar to throw an error if there's no data
                if (!params) params = {};

                this.template(req, res, name + '.html', params);
            }
        });
    }
}

module.exports = Controllers;