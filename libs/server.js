var http = require("http");

module.exports = {
    init: function() {
        // if ran from c9, use its port
        process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

        // registering routes
        this.routes.registerRoutes();

        var router = this.router;

        // starts the server
        var server = http.createServer(function(req, res) {
            // sending request to router
            router.match(req, res);
        }).listen(process.env.PORT);

        // socket.io initialization
        this.sockets.initialize(server);

        return console.log("ThinAir server listening on port " + process.env.PORT);
    }
};