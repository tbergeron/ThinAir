module.exports = {
    // adds a message to the collection
    addMessage: function(req, type, message) {
        var messages = req.sessions.getData('messages')

        if (messages === undefined) {
            messages = []
        }

        if ((type !== undefined) && (message !== undefined)) {
            messages.push({ type: type, message: message })
        }

        req.sessions.setData('messages', messages)
    },

    // returns the message list
    getMessages: function(req) {
        var messages = req.sessions.getData('messages')

        if (messages === undefined) {
            messages = []
        }

        // resets the messages once they are fetched
        req.sessions.setData('messages', [])

        return messages
    }
}