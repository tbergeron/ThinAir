var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({
    Projects: null,

    setup: function() {
        this.Projects = this.repositories.Projects;
    },

    index: function(req, res, params) {
        this.sendTemplate(req, res, 'index');
    },

    projects: function(req, res, params) {
        var that = this;

        this.Projects.getAll(function(projects) {
            that.sendTemplate(req, res, 'projects', { projects: projects });
        });
    },

    create: function(req, res, params) {
        console.log(req.sessions);
        
        req.sessions.createSession(res, { foo: "data!" }, function(err) {
            console.log('created! ' + err);
        });
    },

    get: function(req, res, params) {
        req.sessions.getSession(req, function(err, data) {
            console.log('session data:');
            console.log(data);
        });
    },

    delete: function(req, res, params) {
        req.sessions.destroySession(req, res, function(err) {
            console.log('deleted! ' + err);
        });
    }

});