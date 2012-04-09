var collection  = require('mongo-col'),
    pd          = require('pd');

var Projects = pd.extend(Object.create(collection('projects', 'thinair')), {

  // gets a list of all projects sorting by date_created ascending.
  allByDate: function(callback) {
    this.find().sort({date_created:1}).toArray(function(err, projects) {
       if (!err || projects) {
         callback(projects);
       } else {
         callback(null);
       }
    });
  },

  // gets a project by its code
  byCode: function(code, callback) {
    this.findOne({ code: code }, function(err, project) {
     if(!err || project) {
       callback(project);
     } else {
       callback(null);
     }
    });
  },

  // saves a project
  save: function(project, callback) {
    // save object
    //var project_code = slugify(project.name)

    // todo: CHECK FOR DUPLICATES
    //validates('project', project, function(errors) {
    //  if (!errors) {
    //    if (isNew(project)) {
          // if it's a new project, save it
    //      db.projects.save({
    //        code: project_code,
    //        name: project.name
    //      })

          // fetch the saved project
    //      db.projects.findOne({ code: project_code }, function(err, new_project) {
    //        return callback(new_project)
    //      })

    //    } else {
          // if it's not a new project, update the existing one
    //      db.projects.update({ _id: db.ObjectId(project._id) }, { $set: {
    //        code: project_code,
    //        name: project.name
    //      }})

          // fetch the created project
    //      db.projects.findOne({ _id: db.ObjectId(project._id) }, function(err, updated_project) {
    //        return callback(updated_project)
    //      })
    //    }
    //  } else {
        // if there's validation errors
    //    if (isNew(project)) {
          // if it's a new project, send it as it is
    //      return callback(project, errors)

    //    } else {
          // if it's an existing one, fetch it and put and replace the values with the on from the form
    //      db.projects.findOne({ _id: db.ObjectId(project._id) }, function(err, fetched_project) {
    //        fetched_project.code = project_code
    //        fetched_project.name = project.name

    //        return callback(fetched_project, errors)
    //      })
    //    }
    //  }

    //})
  },

  // deletes an object
  delete: function(code, callback) {
    //db.projects.remove({ code: code }, function(err) {
    //  if (err) {
    //    console.t.log('error', 'Unable to delete project.')
    //  }

    //  callback(err)
    //})
  }

});

module.exports = Projects;