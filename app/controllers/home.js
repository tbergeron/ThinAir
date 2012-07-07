var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({
    index: function(req, res, params) {
        this.sendTemplate(req, res, 'index');
    }
});