module.exports = {
    io: null,
    socket: null,

    initialize: function(server) {
        console.log("initialized!");
        this.io = require('socket.io').listen(server);

        var that = this;

        this.io.sockets.on('connection', function(socket) {
            that.socket = socket;
        });
    },

    createReactiveMethod: function(name, callback) {
        console.log("creating method " + name);
        this.socket.on(name, callback);
    }
}