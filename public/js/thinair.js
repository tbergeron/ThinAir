var socket = io.connect();

// gets a view from the server and compiles it with handlebars
function getViewFromServer(viewName, context, callback) {
	socket.emit('getView', viewName, function (data) {
		var template = Handlebars.compile(data);
		var view = template(context);
		callback(view);
	});
}
