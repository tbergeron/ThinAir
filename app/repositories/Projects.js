var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createRepository("projects", {
    // gets a list of project, sorted by date_created
    getAllByDate: function(callback) {
        this.find().sort({ date_created: 1 }).toArray(function(err, projects) {
            if (err) console.log(err);
            return callback(projects ? projects : null);
        });
    },
});