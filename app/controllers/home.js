var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({
    index: function(req, res, params) {
        this.template(req, res, 'index.html', params); 
    }
});