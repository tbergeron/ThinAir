var helpers = require("../../libs/helpers"),
    createRepository = require("../../libs/repositories").createRepository;

var Projects = createRepository("projects", {
  // gets a list of project, sorted by date_created
  allByDate: function(callback) {
    this.find().sort({ date_created: 1 }).toArray(function(err, projects) {
      if (err) console.log(err);

      return callback(projects ? projects : null);
    });
  },

  // gets one project by its code
  byCode: function(code, callback) {
    this.baseFindOne({ code: code }, function(project) {
      return callback(project ? project : null);
    });
  },

  // saves a project
  save: function(project, callback) {
    // converts the project's code to a slug
    project.code = helpers.slugify(project.name);

    this.baseSave(project, function(savedProject, errors) {
      return callback(savedProject, errors);
    });
  },

  // deletes a project by its ObjectID
  delete: function(objectId, callback) {
    this.baseDelete({ _id: this.ObjectId(objectId) }, function(success, project) {
      return callback(success, project);
    });
  }
});

module.exports = Projects;