var createRepository = require('../../libs/repository').createRepository;

var Users = createRepository('users', {

  byUsernameAndPassword: function(username, password, callback) {
    this.findOne({ username: username, password: password }, function(err, user) {
      if (err) console.log(err);

      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
  }

});

module.exports = Users;