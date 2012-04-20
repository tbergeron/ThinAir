helpers = require("./helpers")
validator = require("./validator")
collection = require("mongo-col")
pd = require("pd")

Repository = createRepository: (name, content) ->
  db = collection(name, process.env["MONGODB_DATABASE"])
  pd.extend Object.create(db), content,
    ObjectId: require("mongodb").ObjectID
    baseSave: (object, callback) ->
      validator.validate name, object, (errors) ->
        if errors
          callback object, errors
        else
          db.save object, (err) ->
            if err
              console.log err
              callback object, err

module.exports = Repository