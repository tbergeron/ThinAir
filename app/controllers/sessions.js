var ThinAir = require('../..');

module.exports = ThinAir.createController({
    create: function(req, res, params) {
        req.session.userId = 9;
        res.end();
    },

    get: function(req, res, params) {
        var data = req.session.userId;
        
        if (data) {
            res.write(JSON.stringify(data));
        }

        res.end();
    }
});