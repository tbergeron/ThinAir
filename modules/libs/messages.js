// Generated by CoffeeScript 1.3.1
(function() {
  var Messages;

  Messages = {
    addMessage: function(req, type, message) {
      var messageObject;
      if (req.session.messages === undefined) {
        req.session.messages = [];
      }
      if ((type !== undefined) && (message !== undefined)) {
        messageObject = {
          type: type,
          message: message
        };
        req.session.messages.push(messageObject);
      }
      return req.session.messages;
    },
    getMessages: function(req) {
      var messages;
      if (req.session.messages !== undefined) {
        messages = req.session.messages;
        req.session.messages = [];
        return messages;
      }
    }
  };

  module.exports = Messages;

}).call(this);
