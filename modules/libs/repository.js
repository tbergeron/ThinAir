var helpers          = require('../../libs/helpers'),
    validator        = require('../../libs/validator'),
    collection       = require('mongo-col'),
    pd               = require('pd');

var Repository = {
  createRepository: function(name, content) {
    var db = collection(name, process.env["MONGODB_DATABASE"]);

    return pd.extend(Object.create(db), content, {
        ObjectId: require('mongodb').ObjectID,

        baseSave: function (object, callback) {
          validator.validate(name, object, function(errors) {
            if (errors) {
              return callback(object, errors);
            } else {
              db.save(object, function(err) {
                if (err) {
                  console.log(err);
                  return callback(object, err);
                }
              });
            }
          });
        }

    });
  }
};

module.exports = Repository;