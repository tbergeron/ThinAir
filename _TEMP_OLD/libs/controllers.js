var pd = require('pd'),
    routil = require('routil'),
    send = require('routil-send')

var Controllers = {
    // creates a basic controller
    createController: function(content) {
        return pd.extend(Object.create({}), routil, send, content, {

            // is a GET request?
            isGet: function(req) {
                if (req.method === 'GET') {
                    return true
                } else {
                    return false
                }
            },

            // is a POST request?
            isPost: function(req) {
                if (req.method === 'POST') {
                    return true
                } else {
                    return false
                }
            },

            // is the request an AJAX call?
            isXHR: function(req) {
                if (req.header('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') {
                    return true
                } else {
                    return false
                }
            },

            // sends a template
            sendTemplate: function(req, res, name, params) {
                // preventing templar to throw an error if there's no data
                if (!params) params = {}

                // Getting messages from sessions, so they can be shown anywhere at anytime
                var messages = this.messages.getMessages(req)
                params.messages = messages

                this.messages.clearMessages(req)

                return this.template(req, res, name + '.html', params)
            }

        })
    }
}

module.exports = Controllers