var test = require('testling'),
    controllers = require('../libs/controllers.js')

test('controller creation', function (t) {
    var controller = controllers.createController({})

    // controller creation
    t.type(controller, "object", "controller should be an object")

    // controller's basic functions
    t.type(controller.isGet, "function", "isGet should be a function in controller")
    t.type(controller.isPost, "function", "isPost should be a function in controller")
    t.type(controller.isXHR, "function", "isXHR should be a function in controller")
    t.type(controller.sendTemplate, "function", "sendTemplate should be a function in controller")

    t.end();
});