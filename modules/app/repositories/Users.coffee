createRepository = require("../../libs/repository").createRepository

Users = createRepository("users",
  byUsernameAndPassword: (username, password, callback) ->
    @findOne username: username, password: password, (err, user) ->
      if err then console.log err
      callback if user then user else null
)

module.exports = Users