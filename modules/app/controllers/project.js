var helpers = require('../../libs/helpers');

var ProjectController = {
  Projects: null,

  initialize: function(req, res) {
    helpers.checkIfAuthorized(req, res);
    this.Projects = this.repositories.Projects;
  },

  // GET: /projects
  list: function(req, res) {
    var that = this;
    this.Projects.allByDate(function(projects) {
      if (projects) {
        res.render('projects/list', {
          title: 'List of projects',
          projects: projects
        });
      } else {
        that.messages.addMessage(req, 'error', 'No projects found.');
        res.redirect('/');
      }
    });
  },

  // GET: /projects/new
  new: function(req, res) {
    res.render('projects/edit', {
      title: 'Create a new project'
    });
  },

  // GET: /projects/edit/:project_code
  editGet: function(req, res) {
    var that = this;
    this.Projects.byCode(req.params.project_code, function(project) {
      if (project) {
        res.render('projects/edit', {
          title: 'Editing project: ' + project.name,
          project: project
        });
      } else {
        that.messages.addMessage(req, 'error', 'Unable to find project.');
        res.redirect('/projects');
      }
    });
  },

  // POST: /projects/edit/:project_code
  editPost: function(req, res) {
    var that = this;

    this.Projects.save(req.body.project, function(project, errors) {
      if (errors) {
        that.validator.flashErrors(req, errors);
      } else {
        that.messages.addMessage(req, 'success', 'Saved with success.');
      }

      res.render('projects/edit', {
        title: 'Editing project: ' + project.name,
        project: project
      });
    });
  },

  // GET: /projects/delete
  delete: function(req, res) {
    var that = this;
    this.Projects.delete(req.params.project_code, function(err) {
      if (!err) {
        that.messages.addMessage(req, 'success', 'Project with code "' + req.params.project_code + '" has been deleted with success.');
      }
      res.redirect('/projects');
    });
  }

};

module.exports = ProjectController;