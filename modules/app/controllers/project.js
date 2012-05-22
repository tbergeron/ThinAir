var createController = require("../../libs/controllers").createController;

var ProjectController = createController({
  Projects: null,

  setup: function(req, res) {
    this.Projects = this.repositories.Projects;
  },

  init: function(){
    // initializing a reactive method
    var that = this;
    this.sockets.createReactiveMethod('callProjectListController', function(parameters, callback){
      that.list(null, null, function(projects){
        callback(projects);        
      });

    });
  },

  // /projects
  // reactiveMethodCallback is there to make the method usable via reactive methods
  list: function(req, res, reactiveMethodCallback) {
    var that = this;

    this.Projects.getAllByDate(function(projects) {
      // if called from reactive method
      if (!res) {
        reactiveMethodCallback(projects);
      }

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