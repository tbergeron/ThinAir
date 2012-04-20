helpers = require("../../libs/helpers")

ProjectController =
  Projects: null

  initialize: (req, res) ->
    helpers.checkIfAuthorized req, res
    @Projects = @repositories.Projects

  list: (req, res) ->
    that = this
    @Projects.allByDate (projects) ->
      if projects
        res.render "projects/list",
          title: "List of projects"
          projects: projects
      else
        that.messages.addMessage req, "error", "No projects found."
        res.redirect "/"

  new: (req, res) ->
    res.render "projects/edit",
      title: "Create a new project"

  editGet: (req, res) ->
    that = this
    @Projects.byCode req.params.project_code, (project) ->
      if project
        res.render "projects/edit",
          title: "Editing project: " + project.name
          project: project
      else
        that.messages.addMessage req, "error", "Unable to find project."
        res.redirect "/projects"

  editPost: (req, res) ->
    that = this
    @Projects.save req.body.project, (project, errors) ->
      if errors
        that.validator.flashErrors req, errors
      else
        that.messages.addMessage req, "success", "Saved with success."
      res.render "projects/edit",
        title: "Editing project: " + project.name
        project: project

  delete: (req, res) ->
    that = this
    @Projects.remove req.params.project_code, (err) ->
      that.messages.addMessage req, "success", "Project with code \"" + req.params.project_code + "\" has been deleted with success."  unless err
      res.redirect "/projects"

module.exports = ProjectController