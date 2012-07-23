var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({

    test: function(req, res, params) {
        res.write('hello world');
        res.end();
    },

    testTemplate: function(req, res, params) {
        this.sendTemplate(req, res, 'index');
    }

});