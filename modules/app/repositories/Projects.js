var helpers          = require('../../libs/helpers'),
    createRepository = require('../../libs/repository').createRepository;

var Projects = createRepository('projects', {
  // gets a list of all projects sorting by date_created ascending.
  allByDate: function(callback) {

    this.find().sort({ date_created: 1 }).toArray(function(err, projects) {
      if (err) console.log(err);

      if (projects) {
        callback(projects);
      } else {
        callback(null);
      }
    });
  },

  // gets a project by its code
  byCode: function(code, callback) {
    this.findOne({ code: code }, function(err, project) {
      if (err) console.log(err);

      if (project) {
        callback(project);
      } else {
        callback(null);
      }
    });
  },

  // saves a project
  save: function(project, callback) {
    project.code = helpers.slugify(project.name);

    //todo: CHECK FOR DUPLICATES

    this.baseSave(project, function(savedProject, errors) {
      return callback(savedProject, errors);
    });
  },

  // deletes an object
  delete: function(code, callback) {
    this.remove({ code: code }, function(err) {
      if (err) callback(err);
    });
  }

});

module.exports = Projects;