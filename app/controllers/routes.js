var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({

    test: function(req, res, params) {
        res.write('hello world');
        res.end();
    },

});