var helpers = require("../../libs/helpers"),
    createRepository = require("../../libs/repositories").createRepository;

var Projects = createRepository("projects", {
  allByDate: function(callback) {
    this.find().sort({ date_created: 1 }).toArray(function(err, projects) {
      if (err) console.log(err);

      return callback(projects ? projects : null);
    });
  },

  byCode: function(code, callback) {
    this.baseFindOne({ code: code }, function(project) {
      return callback(project ? project : null);
    });
  },

  save: function(project, callback) {
    project.code = helpers.slugify(project.name);

    this.baseSave(project, function(savedProject, errors) {
      return callback(savedProject, errors);
    });
  },

  delete: function(objectId, callback) {
    this.baseDelete({ _id: this.ObjectId(objectId) }, function(success, project) {
      return callback(success, project);
    });
  }
});

module.exports = Projects;