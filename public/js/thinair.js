var socket = io.connect();

// calls a reactive method
var callReactiveMethod = function(name, parameters, callback) {
	socket.emit(name, parameters, function (data) {
		callback(data);
	});
}