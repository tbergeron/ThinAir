var pd = require('pd'),
    createController = require('./controllers').createController;

// proxies for general framework-related methods
var ThinAir = {
    createController: function(content) { 
        return createController(content); 
    }
}

module.exports = ThinAir;