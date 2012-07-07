var ThinAir = require("../../libs/thinair");

var HomeController = ThinAir.createController({
    index: function(req, res, params) {
        this.sendHtml(res, '<strong>hello world</strong>');
    }
});

module.exports = HomeController;