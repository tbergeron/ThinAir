var pd = require('pd'),
    routil = require('routil'),
    Session = require("routil-session"),
    session = Session({
        store: require('mongo-store')({
            collection: require('mongo-col')('sessions', process.env['MONGODB_DATABASE'])
        })
    });

var Controllers = {
    // creates a basic controller
    createController: function(content) {
        return pd.extend(Object.create({}), routil, session, content, {
            // sends a template
            sendTemplate: function(req, res, name, params) {
                // preventing templar to throw an error if there's no data
                if (!params) params = {};

                this.template(req, res, name + '.html', params);
            }
        });
    }
};

module.exports = Controllers;