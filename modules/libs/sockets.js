module.exports = {
    io: null,
    reactiveMethodNames: null,
    reactiveMethods: null,

    initialize: function(server) {
        console.log("initialized!");
        this.io = require('socket.io').listen(server);
        this.reactiveMethodNames = [];
        this.reactiveMethods = [];

        var that = this;

        this.io.sockets.on('connection', function(socket) {
            // calls to create reactive method should start from here...
            // because the initial bind is done with empty createReactiveMethod :-/
            // maybe compiling them in a collection and execute them all once this is executed?
            for (var i = 0; i < that.reactiveMethods.length; i++) {
                socket.on(that.reactiveMethodNames[i], that.reactiveMethods[i]);
            }
        });
    },

    createReactiveMethod: function(name, callback) {
        console.log("creating method " + name);
        this.reactiveMethodNames.push(name);
        this.reactiveMethods.push(callback);
    }
}

