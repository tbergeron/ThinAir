var hbs = require('handlebars'),
    fs = require('fs'),
    path = require('path');

module.exports = {
    initializeTemplateEngine: function (routil, uri) {
        // registering partials
        registerPartials(hbs);

        routil.config({ templar: getTemplarInstance(routil.Templar, uri) });
    }
}

function getTemplarInstance(templar, path) {
    templar.loadFolder(path);
    
    var engine = {
        compile: function (contents, options) {
            var compiled = hbs.compile(contents, options);

            return function (data) {
                return compiled(data);
            };
        }
    };

    return {
        engine: engine,
        folder: path
    };
}

// registers any partial contained in app/views/partials
function registerPartials(hbs) {
    var partialPath = (process.env.CALLED_FROM_TESTS) ?  path.join(process.cwd(), '../app/views/partials') : path.join(__dirname, '../../../app/views/partials');

    // read a partial's content
    var readPartials = function(err, files) {
        if (files) {
            return files.forEach(loadPartial);
        }
    };

    // register the hbs partial
    var loadPartial = function(file) {
        var partialName = file.replace('.html', '');
        return hbs.registerPartial(partialName, fs.readFileSync(path.join(partialPath, file), 'UTF-8'));
    }

    return fs.readdir(partialPath, readPartials);
}
