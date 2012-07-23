var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({
    create: function(req, res, params) {
        this.sessions.createSession(res, { userId: 9 }, function(err) { 
            if (err) res.write(err);
            res.end();
        });
    },

    get: function(req, res, params) {
        this.sessions.getSession(req, function(err, data) {
            if (data) {
                res.write(JSON.stringify(data));
            }

            res.end();
        });
    }
});