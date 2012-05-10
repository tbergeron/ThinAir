var mongo      = require("./mongo"),
    validator  = require("./validator"),
    collection = require("mongo-col"),
    pd         = require("pd");

var Repositories = {
  // creates a basic repository
  createRepository: function(name, content) {
    // connection to the collection
    var db = collection(name, process.env["MONGODB_DATABASE"]);

    return pd.extend(Object.create(db), content, {
      // reference to MongoDB's ObjectID
      ObjectId: require("mongodb").ObjectID,

      // basic findOne
      baseFindOne: function(conditions, callback) {
        db.findOne(conditions, function(err, object) {
          if (err) console.log(err);
          return callback(object ? object : null);
        });
      },

      // basic object delete with existence verification
      baseDelete: function(conditions, callback) {
        var that = this;

        this.baseFindOne(conditions, function(object) {
          if (object) {
            db.remove(conditions, function(err) {
              return callback((err) ? false : true, object);
            });
          } else {
            return callback(false, null);
          }
        });
      },

      // basic save with validation handling
      baseSave: function(object, callback) {
        var that = this;

        // validates the object
        validator.validate(name, object, function(errors) {
          // if there's errors, return the object with its validation errors
          if (errors) {
            return callback(object, errors);

          } else {
            // if it's a new object, save it and return it with its new ObjectID
            if (mongo.isNew(object)) {
              object._id = new that.ObjectId();
              db.insert(object, function(err) {
                if (err) {
                  console.log(err);
                  return callback(object, err);
                }
              });

            } else {
              // if the object already exists, update it and return the object
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