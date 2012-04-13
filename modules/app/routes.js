var getAction = require('../libs/helpers').getAction;

module.exports = {
  registerRoutes: function(app) {
    // trying to get this as short as possible
    var home    = this.controllers.home,
        user    = this.controllers.user,
        project = this.controllers.project;

    // home
    app.get('/', home.index);

    // users
    app.post('/users/login', user.login);
    app.get('/users/logout', user.logout);

    // projects
    app.get('/projects', project.list);
    app.get('/projects/new', project.new);
    app.get('/projects/edit/:project_code', project.edit);
    app.post('/projects/edit', project.edit);
    //app.get('/projects/delete/:project_code',   projectController.delete);

    // projects' milestones
    //app.get('/projects/:project_code/milestones/new', this.controllers.milestone.new);
    //app.get('/projects/:project_code/milestones/edit/:milestone_code', this.controllers.milestone.edit);
    //app.post('/projects/:project_code/milestones/edit', this.controllers.milestone.edit);
    //app.get('/projects/:project_code/milestones/delete/:milestone_code', this.controllers.milestone.delete);
  }
};