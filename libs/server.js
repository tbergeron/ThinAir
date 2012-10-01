var http = require('http'),
    router = require('./router');
    
var requestHandler = function(req, res) {
    // sending request to router
    router.match(req, res);
};

requestHandler.startServer = function() {
    // if ran from c9, use its port
    process.env.PORT = (process.env.C9_PORT != undefined) ? process.env.C9_PORT : process.env.PORT;

    // starts the server
    var server = http.createServer(requestHandler).listen(process.env.PORT, function() {
        console.log('ThinAir server is started and listening on port ' + process.env.PORT);
    });

    return server;
};

module.exports = requestHandler;