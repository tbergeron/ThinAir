var collection  = require("mongo-col"),
    pd 			    = require("pd")

var Users = pd.extend(Object.create(collection("users", "thinair")), {
  
  byUsernameAndPassword: function (username, password, callback) {
    this.findOne({ username: username, password: password }, function(err, user) {
      if (err) {
        return callback(err)
      }
      if(user) {
        return callback(null, user)
      }
      callback(null, false)
    })
  }
  
})

module.exports = Users