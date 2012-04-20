Router = getAction: (controller, action) ->
  (req, res) ->
    controller.initialize req, res  if typeof controller.initialize is "function"
    controller[action] req, res

module.exports = Router