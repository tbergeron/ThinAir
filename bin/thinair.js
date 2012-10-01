#!/usr/bin/env node

var fs = require('fs'),
    async = require('async'),
    path = require('path');

var argv = require('optimist').argv;
var args = argv._;

var basePath = '.';

if (argv.path) {
    basePath = argv.path;
}

if (args[0] === undefined) {
    console.error('Please specify an option. [ start | init | version ]');

} else if (args[0] === 'version') {
    console.log('You are currently running ThinAir version', require('../package.json').version, "\n", ' => Check https://github.com/Brainpad/ThinAir for the latest updates.');

} else if (args[0] == 'start') {
    if (checkIfAppDirectoryExists()) {
        require('../index').start();
    } else {
        console.error('This is not a ThinAir application. To create a new one please use: "thinair init"');
    }

} else if (args[0] == 'init') {
    if (checkIfAppDirectoryExists()) {
        console.error('There is already an application in this directory.');
    } else {
        console.warn('Creating new ThinAir application...');

        var directories = [
            './app',
            './app/controllers',
            './app/helpers',
            './app/repositories',
            './app/validations',
            './app/views',
            './app/views/partials'
        ];

        createDirectories(directories, function(result) {
            if (result) {
                writeBasicAppFiles(function() {
                    console.warn('New ThinAir has been created successfully!');
                });
            }
        });
    }
}

// TODOTB: Should write thinair.js
function writeBasicAppFiles(callback) {
    writeRoutes(function(err) {
        if (err) {
            console.error('Error while writing app/routes!');
        } else {
            console.log(' = Writing app/routes.js...');

            writeController(function(err) {
                if (err) {
                    console.error('Error while writing app/controllers/home.js!');
                } else {
                    console.log(' = Writing app/controllers/home.js...');

                    writeView(function(err) {
                        if (err) {
                            console.error('Error while writing app/views/index.html!');
                        } else {
                            console.log(' = Writing app/views/index.html...');

                            writePlaceholders(function(err) {
                                if (err) {
                                    console.error('Error while writing placeholders!');
                                } else {
                                    console.log(' = Writing placeholders...');

                                    writeEntrypoint(function(err) {
                                        if (err) {
                                            console.error('Error while writing entry point (index.js)!');
                                        } else {
                                            console.log(' = Writing entry point (index.js)...');
                                        }                                        
                                    });
                                }
                            });
                        }
                    });
                }                
            });
        }
    });

    function writeRoutes(next) {
        var content = "module.exports = function(router, getAction) {\n    router.add('/', getAction('home', 'index'));\n};";
        fs.writeFile(path.join(basePath, './app/routes.js'), content, function(err) {
            next(err);
        });
    }

    function writeController(next) {
        var content = "var ThinAir = require('thinair');\n\nmodule.exports = ThinAir.createController({\n    index: function(req, res, params) {\n        this.sendTemplate(req, res, 'index', params);   \n    }\n});";
        fs.writeFile(path.join(basePath, './app/controllers/home.js'), content, function(err) {
            next(err);
        });
    }

    function writeView(next) {
        var content = "<h1>Hello world!</h1>";
        fs.writeFile(path.join(basePath, './app/views/index.html'), content, function(err) {
            next(err);
        });
    }

    function writeEntrypoint(next) {
        var content = "require('thinair').start();";
        fs.writeFile(path.join(basePath, './index.js'), content, function(err) {
            next(err);
        });
    }

    function writePlaceholders(next) {
        fs.writeFile(path.join(basePath, './app/helpers/placeholder.js'), '', function(err) {
            fs.writeFile(path.join(basePath, './app/repositories/placeholder.js'), '', function(err) {
                fs.writeFile(path.join(basePath, './app/validations/placeholder.json'), '', function(err) {
                    next(err);
                });
            });
        });
    }
}

function createDirectories(list, callback) {
    async.forEachSeries(list, createDirectory, function(err, results) {
        callback((err) ? false : true);
    });

    function createDirectory(name, next) {
        fs.mkdir(path.join(basePath, name), 0755, function(e) {
            if (e) {
                console.error('Error while creating', name);
                next(e);
            } else {
                console.warn(' - Created directory:', name);
                next();
            }
        });
    }
}

function checkIfAppDirectoryExists(callback) {
    return fs.existsSync(path.join(basePath, './app'));
}