var pd = require('pd'),
    createController = require('./controllers').createController,
    createRepository = require("./repositories").createRepository;


// proxies for general framework-related methods
var ThinAir = {
    createController: function(content) { 
        return createController(content); 
    },
    createRepository: function(name, content) { 
        return createRepository(name, content); 
    }
}

module.exports = ThinAir;