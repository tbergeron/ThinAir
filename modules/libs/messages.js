var Messages = {
  addMessage: function(req, type, message) {
    if (req.session.messages === undefined) {
      req.session.messages = [];
    }

    if ((type !== undefined) && (message !== undefined)) {
      var messageObject = { type: type, message: message };
      req.session.messages.push(messageObject);
    }

    return req.session.messages;
  },

  getMessages: function(req) {
    if (req.session.messages !== undefined) {
      var messages = req.session.messages;
      // cleaning messages
      req.session.messages = [];

      return messages;
    }
  }

}

module.exports = Messages;