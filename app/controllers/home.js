var ThinAir = require('../../libs/thinair')
    , session = require("routil-session")()

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

        // response from the form
        if (this.isPost(req)) {
            var that = this;

            console.log(req.body);

            // this.Projects.save(params.project, function(project, errors) {
            //     if (errors) {
            //         that.validator.addErrorsToMessages(req, errors);
            //     } else {
            //         message = 'full of win!';
            //     }
            // });
        }

        this.sendTemplate(req, res, 'validators', { message: message });
    },

    create: function(req, res, params) {
        session.createSession(req, res, { userId: 9 });
        res.end();
    },

    get: function(req, res, params) {
        session.getSession(req, function(err, data) {
            console.error('data?', data)
            res.end(data)
        });
    }
});