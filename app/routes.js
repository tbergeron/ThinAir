module.exports = {
  registerRoutes: function(app, controllers) {
    // home
    app.get('/', controllers.index);
  
    // users
    //app.post(app, '/users/login', controllers.users.login);
    //app.get(app, '/users/logout', controllers.users.logout);
  
    // projects
    //g(app, '/projects',                        projectController.list);
    //g(app, '/projects/new',                    projectController.new);
    //g(app, '/projects/edit/:project_code',     projectController.edit);
    //p(app, '/projects/edit',                   projectController.edit);
    //g(app, '/projects/delete/:project_code',   projectController.delete);
  
    // projects' milestones
    //g(app, '/projects/:project_code/milestones/new',                     milestoneController.new);
    //g(app, '/projects/:project_code/milestones/edit/:milestone_code',    milestoneController.edit);
    //p(app, '/projects/:project_code/milestones/edit',                    milestoneController.edit);
    //g(app, '/projects/:project_code/milestones/delete/:milestone_code',  milestoneController.delete);
  }
}