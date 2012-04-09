var collection  = require('mongo-col'),
    pd          = require('pd');

var Users = pd.extend(Object.create(collection('users', 'thinair')), {

  byUsernameAndPassword: function (username, password, callback) {
    this.findOne({ username: username, password: password }, function(err, user) {
    if(!err || user) {
        callback(user);
      } else {
        callback(null);
      }
      });
    }

});

module.exports = Users;