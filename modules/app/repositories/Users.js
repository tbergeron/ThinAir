var createRepository = require("../../libs/repositories").createRepository;

var Users = createRepository("users", {
  byUsernameAndPassword: function(username, password, callback) {
    this.findOne({ username: username, password: password }, function(err, user) {
      if (err) console.log(err);
      return callback(user ? user : null);
    });
  }
});

module.exports = Users;