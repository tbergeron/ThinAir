var helpers = require("../../libs/helpers"),
    createController = require("../../libs/controllers").createController;

var ProjectController = createController({
  Projects: null,

  initialize: function(req, res) {
    helpers.checkIfAuthorized(req, res);
    this.Projects = this.repositories.Projects;
  },

  list: function(req, res) {
    var that = this;

    this.Projects.allByDate(function(projects) {
      res.render("projects/list", {
        title: "List of projects",
        projects: projects
      });
    });
  },

  new: function(req, res) {
    res.render("projects/edit", { title: "Create a new project" });
  },

  editGet: function(req, res) {
    var that = this;

    this.Projects.byCode(req.params.project_code, function(project) {
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

  editPost: function(req, res) {
    var that = this;

    this.Projects.save(req.body.project, function(project, errors) {
      if (errors) {
        that.validator.flashErrors(req, errors);
      } else {
        that.messages.addMessage(req, "success", "Saved with success.");
      }

      res.render("projects/edit", {
        title: "Editing project: " + project.name,
        project: project
      });
    });
  },

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