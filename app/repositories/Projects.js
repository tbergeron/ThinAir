var ThinAir = require('thinair')

module.exports = ThinAir.createRepository("projects", {
    // gets a list of project
    getAll: function(callback) {
        this.find().toArray(function(err, projects) {
            if (err) console.log(err)
            return callback(projects ? projects : null)
        })
    },
    
    // saves a project
    save: function(project, callback) {
        // converts the project's code to a slug
        project.code = ThinAir.slugify(project.name)

        this.baseSave(project, function(savedProject, errors) {
            return callback(savedProject, errors)
        })
    }
})