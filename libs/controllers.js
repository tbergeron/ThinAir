var pd = require('pd'),
    routil = require('routil'),
    Session = require("routil-session"),
    db = require('mongodb').Db,
    Server = require('mongodb').Server,
    dbInstance = new db(process.env['MONGODB_DATABASE'], new Server(process.env['MONGODB_HOST'], process.env["MONGODB_PORT"])),
    session = Session();

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