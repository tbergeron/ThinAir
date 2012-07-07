var createController = require("../../libs/controllers").createController;

var HomeController = createController({
    index: function(req, res, params) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }
});

module.exports = HomeController;