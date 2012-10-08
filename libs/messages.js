module.exports = {
    // adds a message to the collection
    addMessage: function(req, type, message) {
        var messages = req.session.messages;

        if (messages === undefined) {
            messages = [];
        }

        if ((type !== undefined) && (message !== undefined)) {
            messages.push({ type: type, message: message });
        }

        req.session.messages = messages;
    },

    // returns the message list
    getMessages: function(req) {
        var messages = req.session.messages;

        if (messages === undefined) {
            messages = [];
        }

        return messages;
    },

    clearMessages: function(req) {
        req.session.messages = [];
    }
};