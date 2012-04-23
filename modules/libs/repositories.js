var helpers = require("./helpers"),
    validator = require("./validator"),
    collection = require("mongo-col"),
    pd = require("pd");

var Repositories = {
  createRepository: function(name, content) {
    var db = collection(name, process.env["MONGODB_DATABASE"]);

    return pd.extend(Object.create(db), content, {
      ObjectId: require("mongodb").ObjectID,

      baseSave: function(object, callback) {
        var that = this;

        validator.validate(name, object, function(errors) {
          if (errors) {
            return callback(object, errors);

          } else {
            if (helpers.isNew(object)) {
              object._id = new that.ObjectId();
              db.save(object, function(err) {
                if (err) {
                  console.log(err);
                  return callback(object, err);
                }
              });

            } else {
              var objectToUpdate = pd.extend({}, object);
              delete objectToUpdate._id;

              db.update({ _id: that.ObjectId(object._id) }, { $set: objectToUpdate }, function(err) {
                if (err) {
                  console.log(err);
                  return callback(object, err);
                }
              });
            }

            return callback(object);
          }
        });
      }
    });
  }
};

module.exports = Repositories;