module.exports = {
  registerRoutes: function(app) {
    var getAction = this.router.getAction;

    // trying to get this as short as possible
    var home    = this.controllers.home,
        user    = this.controllers.user,
        project = this.controllers.project;

    // home
    app.get('/', getAction(home, 'index'));

    // users
    app.post('/users/login', getAction(user, 'login'));
    app.get('/users/logout', getAction(user, 'logout'));

    // projects
    app.get('/projects', getAction(project, 'list'));
    app.get('/projects/new', getAction(project, 'new'));
    app.get('/projects/edit/:project_code', getAction(project, 'editGet'));
    app.post('/projects/edit', getAction(project, 'editPost'));
    app.get('/projects/delete/:project_code', getAction(project, 'delete'));

    // projects' milestones
    //app.get('/projects/:project_code/milestones/new', this.controllers.milestone.new);
    //app.get('/projects/:project_code/milestones/edit/:milestone_code', this.controllers.milestone.edit);
    //app.post('/projects/:project_code/milestones/edit', this.controllers.milestone.edit);
    //app.get('/projects/:project_code/milestones/delete/:milestone_code', this.controllers.milestone.delete);
  }
};