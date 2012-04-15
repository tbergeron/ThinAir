var bindAll = require("pd").bindAll;

module.exports = {
  registerRoutes: function(app) {
    // trying to get this as short as possible
    var home    = this.controllers.home,
        user    = this.controllers.user,
        project = this.controllers.project;

    // home
    app.get('/', handle(home.index, this));

    // users
    app.post('/users/login', handle(user.login, this));
    app.get('/users/logout', handle(user.logout, this));

    // projects
    app.get('/projects', handle(project.list, this));
    app.get('/projects/new', handle(project.new, this));
    app.get('/projects/edit/:project_code', handle(project.edit, this));
    app.post('/projects/edit', handle(project.edit, this));
    app.get('/projects/delete/:project_code', handle(project.delete, this));

    // projects' milestones
    //app.get('/projects/:project_code/milestones/new', this.controllers.milestone.new);
    //app.get('/projects/:project_code/milestones/edit/:milestone_code', this.controllers.milestone.edit);
    //app.post('/projects/:project_code/milestones/edit', this.controllers.milestone.edit);
    //app.get('/projects/:project_code/milestones/delete/:milestone_code', this.controllers.milestone.delete);
  }
};

function handle(action, self) {
    return function(req, res) {
        bindAll({}, self, action, {
            req: req,
            res: res
        }).initialize();
    };
}