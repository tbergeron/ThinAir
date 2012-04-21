Messages =
  addMessage: (req, type, message) ->
    if req.session.messages is `undefined`
      req.session.messages = []

    if (type isnt `undefined`) and (message isnt `undefined`)
      messageObject = type: type, message: message
      req.session.messages.push messageObject

    req.session.messages

  getMessages: (req) ->
    if req.session.messages isnt `undefined`
      messages = req.session.messages
      req.session.messages = []
      messages

module.exports = Messages