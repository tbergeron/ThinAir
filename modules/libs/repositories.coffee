helpers    = require("./helpers")
validator  = require("./validator")
collection = require("mongo-col")
pd         = require("pd")

Repositories = createRepository: (name, content) ->
  db = collection(name, process.env["MONGODB_DATABASE"])

  pd.extend Object.create(db), content,
    ObjectId: require("mongodb").ObjectID

    baseSave: (object, callback) ->
      that = this

      validator.validate name, object, (errors) ->
        if errors
          callback object, errors
        else
          if helpers.isNew object
            object._id = new that.ObjectId()

            db.save object, (err) ->
              if err
                console.log err
                callback object, err
          else
            objectToUpdate = pd.extend {}, object
            delete objectToUpdate._id

            db.update { _id: that.ObjectId(object._id) }, { $set: objectToUpdate }, (err) ->
              if err
                console.log err
                callback object, err

          callback object

module.exports = Repositories