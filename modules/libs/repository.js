var collection  = require('mongo-col'),
    pd          = require('pd');

var Repository = {
  createRepository: function(name, content) {
    return pd.extend(Object.create(collection(name, process.env["MONGODB_DATABASE"])), content);
  }
};

module.exports = Repository;