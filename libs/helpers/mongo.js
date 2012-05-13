var MongoHelpers = {
  // is a new MongoDB object?
  isNew: function(object) {
    if (object._id === undefined || object._id === "") {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = MongoHelpers;