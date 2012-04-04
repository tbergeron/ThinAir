var Users = new function(){
  var instance = null
  
  function ValueObject(){
      var collection  = require("mongo-col"),
          Users       = collection("users", "thinair")
      
    this.byUsernameAndPassword = function (username, password, callback) {
      Users.find({ username: username, password: password }, function(err, user) {
        if(!err || user) {
          callback(user)
        } else {
          callback(false)
        }
      })
    }
  }
  
  this.getInstance = function(){
    if(!instance) {
      instance = new ValueObject()
    }
    
    return instance
  }
}

module.exports = Users.getInstance()