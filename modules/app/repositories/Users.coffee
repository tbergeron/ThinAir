createRepository = require("../../libs/repository").createRepository
Users = createRepository("users",
  byUsernameAndPassword: (username, password, callback) ->
    @findOne
      username: username
      password: password
    , (err, user) ->
      console.log err  if err
      if user
        callback user
      else
        callback null
)
module.exports = Users