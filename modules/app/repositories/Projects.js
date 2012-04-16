var createRepository = require('../../libs/repository').createRepository;

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
    var project_code = this.helpers.slugify(project.name);

    //todo: CHECK FOR DUPLICATES
    // validates('project', project, function(errors) {
    // if (!errors) {
    if (this.helpers.isNew(project)) {
      //if it's a new project, save it
      this.save({ code: project_code, name: project.name });
      //fetch the saved project
      this.findOne({ code: project_code }, function(err, new_project) {
        return callback(new_project);
      });
    } else {
      //if it's not a new project, update the existing one
      this.update({ _id: db.ObjectId(project._id) }, {
        $set: { code: project_code, name: project.name }
      });
      //fetch the created project
      this.findOne({ _id: db.ObjectId(project._id) }, function(err, updated_project) {
        return callback(updated_project);
      });
    }
    // } else {
    //  // todo: remove this when validations are done
    //  var errors = null;
    //  //if there's validation errors
    //  if (isNew(project)) {
    //    //if it's a new project, send it as it is
    //    return callback(project, errors);
    //  } else {
    //    //if it's an existing one, fetch it and put and replace the values with the on from the form
    //    this.findOne({
    //      _id: db.ObjectId(project._id)
    //    }, function(err, fetched_project) {
    //      fetched_project.code = project_code;
    //      fetched_project.name = project.name;
    //      return callback(fetched_project, errors);
    //    });
    //  }
    //  }
    //});
  },

  // deletes an object
  delete: function(code, callback) {
    this.remove({ code: code }, function(err) {
      if (err) callback(err);
    });
  }

});

module.exports = Projects;