module.exports = {
  registerRoutes: function(app) {
    var getAction = this.router.getAction,
        home      = this.controllers.home,
        user      = this.controllers.user,
        project   = this.controllers.project;

    app.get("/", getAction(home, "index"));
    app.post("/users/login", getAction(user, "login"));
    app.get("/users/logout", getAction(user, "logout"));
    
    app.get("/projects",                    getAction(project, "list",      { checkIfAuthorized: true }));
    app.get("/projects/new",                getAction(project, "new",       { checkIfAuthorized: true }));
    app.get("/projects/edit/:project_code", getAction(project, "editGet",   { checkIfAuthorized: true }));
    app.post("/projects/edit",              getAction(project, "editPost",  { checkIfAuthorized: true }));
    app.get("/projects/delete/:object_id",  getAction(project, "delete",    { checkIfAuthorized: true }));

    app.get('*', getAction(home, "error"));
  }
};