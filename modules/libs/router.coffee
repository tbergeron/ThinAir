Router = getAction: (controller, action) ->
  (req, res) ->
    if typeof controller.initialize is "function"
      controller.initialize req, res

    controller[action] req, res

module.exports = Router