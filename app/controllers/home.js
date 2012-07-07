var createController = require("../../libs/controllers").createController;

var HomeController = createController({
    // /projects
    index: function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }
});

module.exports = HomeController;