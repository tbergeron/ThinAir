module.exports = {
  registerRoutes: function(app) {
    // home
    app.get('/', this.controllers.home.index);

    // users
    app.post('/users/login', this.controllers.user.login);
    app.get('/users/logout', this.controllers.user.logout);

    // projects
    app.get('/projects', this.controllers.project.list);
    app.get('/projects/new', this.controllers.project.new);
    app.get('/projects/edit/:project_code', this.controllers.project.edit);
    app.post('/projects/edit', this.controllers.project.edit);
    //g(app, '/projects/delete/:project_code',   projectController.delete);

    // projects' milestones
    //g(app, '/projects/:project_code/milestones/new',                     milestoneController.new);
    //g(app, '/projects/:project_code/milestones/edit/:milestone_code',    milestoneController.edit);
    //p(app, '/projects/:project_code/milestones/edit',                    milestoneController.edit);
    //g(app, '/projects/:project_code/milestones/delete/:milestone_code',  milestoneController.delete);
  }
};