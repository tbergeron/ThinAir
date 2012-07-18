var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createRepository("projects", {
    // gets a list of project
    getAll: function(callback) {
        this.find().toArray(function(err, projects) {
            if (err) console.log(err);
            return callback(projects ? projects : null);
        });
    }
});