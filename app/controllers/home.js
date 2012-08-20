var ThinAir = require('../..')

module.exports = ThinAir.createController({
    setup: function(done) {
        this.Projects = this.repositories.Projects

        // never forget to tell when the controller has finished setup
        done()
    },

    index: function(req, res, params) {
        this.sendTemplate(req, res, 'index')
    },

    projects: function(req, res, params) {
        var that = this

        this.Projects.getAll(function(projects) {
            that.sendTemplate(req, res, 'projects', { projects: projects })
        })
    },

    validators: function(req, res, params) {
        var message

        // response from the form
        if (this.isPost(req)) {
            var that = this

            this.Projects.save(req.body.project, function(project, errors) {
                if (errors) {
                    message = errors[0]
                } else {
                    message = 'success'
                }
                
                that.sendTemplate(req, res, 'validators', { message: message })
            })
        } else {
            this.sendTemplate(req, res, 'validators')
        }
    }
    
})