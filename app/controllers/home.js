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

    validators: function(req, res, params) {
        var message;

        if (this.isPost(req)) {
            message = 'been posted!';
        }

        this.sendTemplate(req, res, 'validators', { message: message });
    },

    create: function(req, res, params) {
        req.createSession(res, { userId: 9 });
    },

    get: function(req, res, params) {
        req.getSession(req, function(err, data) {
            console.log(data);
        });
    }
});