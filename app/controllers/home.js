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

        this.Projects.getAllByDate(function(projects) {
            that.sendTemplate(req, res, 'projects', { projects: projects });
        });
    }
});