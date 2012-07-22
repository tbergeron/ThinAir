var pd = require('pd'),
    routil = require('routil'),
    session = require('routil-session')();

console.log("session?", session)

var Controllers = {
    // creates a basic controller
    createController: function(content) {
        return pd.extend(Object.create({}), routil, content, {
            sessions: session,
            
            // is a GET request?
            isGet: function(req) {
                if (req.method === 'GET') {
                    return true;
                } else {
                    return false;
                }
            },

            // is a POST request?
            isPost: function(req) {
                if (req.method === 'POST') {
                    return true;
                } else {
                    return false;
                }
            },

            // is the request an AJAX call?
            isXHR: function(req, res) {
                if (req.header('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') {
                    return true;
                } else {
                    return false;
                }
            },

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