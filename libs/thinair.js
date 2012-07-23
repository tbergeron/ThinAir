var pd = require('pd'),
    routil = require('routil'),
    createController = require('./controllers').createController,
    createRepository = require('./repositories').createRepository;

// proxies for general framework-related methods
// and very generic methods
var ThinAir = {
    setup: function (done)  {
        // starting template engine
        this.template.initializeTemplateEngine(routil, __dirname + '/../app/views');

        // registering routes
        var router = this.router;
        var routes = this.routes(router, router.getAction);

        console.log('ThinAir is starting...');

        done();
    },

    createController: function(content) { 
        return createController(content); 
    },

    createRepository: function(name, content) { 
        return createRepository(name, content); 
    },

    // is the object defined?
    isDefined: function(object) {
        if (object === undefined) {
            return false;
        } else {
            return true;
        }
    },

    // turns string into a slug
    // example: This Ain't No Title => this-ain-t-no-title
    slugify: function(str) {
        var from, i, l, to;
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        to = 'aaaaeeeeiiiioooouuuunc------';
        i = 0;
        l = from.length;
        while (i < l) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            i++;
        }
        str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        return str;
    }
}

module.exports = ThinAir;