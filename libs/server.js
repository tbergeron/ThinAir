var http = require('http');
    
module.exports = {
    setup: function (done)  {
        // if ran from c9, use its port
        process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

        var router = this.router;

        // if thinhair isn't ran by tests
        if (require.main != module) {
            // starts the server
            var server = http.createServer(function(req, res) {
                // sending request to router
                router.match(req, res);
            }).listen(process.env.PORT, done);

            // socket.io initialization
            this.sockets.initialize(server);

            return console.log('ThinAir server listening on port ' + process.env.PORT);
        }
    }
};