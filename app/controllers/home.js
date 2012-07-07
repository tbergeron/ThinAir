var ThinAir = require("../../libs/thinair");

module.exports = ThinAir.createController({
    index: function(req, res, params) {
        this.sendHtml(res, '<strong>hello world</strong>');
    }
});