var createController = require("../../libs/controllers").createController;

var HomeController = createController({
    index: function(req, res, params) {
        this.sendHtml(res, '<strong>hello world</strong>');
    }
});

module.exports = HomeController;