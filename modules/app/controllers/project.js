var createController = require("../../libs/controllers").createController;

var ProjectController = createController({
  Projects: null,

  setup: function(req, res) {
    this.Projects = this.repositories.Projects;
  },

  init: function(){
    this.sockets.createReactiveMethod('getProject', function(name, callback){
      callback("oh yeah");
    });
  },

  // /projects
  list: function(req, res) {
    var that = this;

    this.Projects.getAllByDate(function(projects) {
      res.render("projects/list", {
        title: "List of projects",
        projects: projects
      });
    });
  },

  // /projects/new
  new: function(req, res) {
    res.render("projects/edit", { title: "Create a new project" });
  },

  // /projects/edit/:project_code
  editGet: function(req, res) {
    var that = this;

    this.Projects.getByCode(req.params.project_code, function(project) {
      if (project) {
        res.render("projects/edit", {
          title: "Editing project: " + project.name,
          project: project
        });

      } else {
        that.messages.addMessage(req, "error", "Unable to find project.");
        res.redirect("/projects");
      }
    });
  },

  // /projects/edit/:project_code
  editPost: function(req, res) {
    var that = this;

    this.Projects.save(req.body.project, function(project, errors) {
      if (errors) {
        that.validator.addErrorsToMessages(req, errors);
      } else {
        that.messages.addMessage(req, "success", "Saved with success.");
      }

      res.render("projects/edit", {
        title: "Editing project: " + project.name,
        project: project
      });
    });
  },

  // /projects/delete/:object_id
  delete: function(req, res) {
    var that = this;

    this.Projects.delete(req.params.object_id, function(success, project) {
      if (success) {
        that.messages.addMessage(req, "success", "Project \"" + project.name + "\" has been deleted with success.");
      } else {
        that.messages.addMessage(req, "error", "Unable to find project.");
      }
      res.redirect("/projects");
    });
  }

});

module.exports = ProjectController;