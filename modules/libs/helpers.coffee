collection = require("mongo-col")
pd         = require("pd")

Helpers =
  checkIfAuthorized: (req, res) ->
    if req.session.is_logged
      true
    else
      @messages.addMessage req, "error", "You need to be logged in to access this page."
      res.redirect "/"

  isGet: (req) ->
    (if (req.route.method is "get") then true else false)

  isPost: (req) ->
    (if (req.route.method is "post") then true else false)

  isNew: (object) ->
    (if (object._id is `undefined` or object._id is "") then true else false)

  isDefined: (object) ->
    (if (object is `undefined`) then false else true)

  slugify: (str) ->
    str = str.replace(/^\s+|\s+$/g, "")
    str = str.toLowerCase()
    from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
    to = "aaaaeeeeiiiioooouuuunc------"
    i = 0
    l = from.length

    while i < l
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
      i++
    str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    str

module.exports = Helpers