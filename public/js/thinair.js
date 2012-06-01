var socket = io.connect();

// calls a reactive method
var callReactiveMethod = function(name, parameters, callback) {
	socket.emit(name, parameters, function (data) {
		callback(data);
	});
}

// gets a view from the server and compiles it with handlebars
// function getViewFromServer(viewName, context, callback) {
// 	callReactiveMethod('getView', { name: viewName }, function(data){
// 		var template = Handlebars.compile(data);
// 		var view = template(context);
// 		callback(view);
// 	});
// }