#!/usr/bin/env node

var fs = require('fs'),
    async = require('async')

var args = require('optimist').argv._

if (args[0] === undefined) {
    console.error('Please specify an option. [ start | init ]')
}

if (args[0] == 'start') {
    if (checkIfAppDirectoryExists()) {
        require('./index').start()
    } else {
        console.error('This is not a ThinAir application. To create a new one please use: "thinair init"')
    }
}

if (args[0] == 'init') {
    if (checkIfAppDirectoryExists()) {
        console.error('There is already an application in this directory.')
    } else {
        console.warn('Creating new ThinAir application...')

        var directories = [
            './app',
            './app/controllers',
            './app/helpers',
            './app/repositories',
            './app/validations',
            './app/views',
            './app/views/partials'
        ]

        createDirectories(directories, function(result) {
            if (result) {
                writeBasicAppFiles(function() {
                    console.warn('New ThinAir has been created successfully!')
                })
            }
        })
    }
}

function writeBasicAppFiles(callback) {
    
    writeRoutes(function(err) {
        if (err) {
            console.error('Error while writing app/routes!')
        } else {
            console.log(' = Writing app/routes.js...')

            writeController(function(err) {
                if (err) {
                    console.error('Error while writing app/controllers/home.js!')
                } else {
                    console.log(' = Writing app/controllers/home.js...')

                    writeView(function(err) {
                        if (err) {
                            console.error('Error while writing app/views/index.html!')
                        } else {
                            console.log(' = Writing app/views/index.html...')
                        }
                    })
                }                
            })
        }
    })

    function writeRoutes(next) {
        var content = "module.exports = function(router, getAction) {\n    router.add('/', getAction('home', 'index'))\n}"
        fs.writeFile('./app/routes.js', content, function(err) {
            next(err)
        })
    }

    function writeController(next) {
        var content = "var ThinAir = require('thinair')\n\nmodule.exports = ThinAir.createController({\n    index: function(req, res, params) {\n        this.sendTemplate(req, res, 'index', params)   \n    }\n})"
        fs.writeFile('./app/controllers/home.js', content, function(err) {
            next(err)
        })
    }

    function writeView(next) {
        var content = "<h1>Hello world!</h1>"
        fs.writeFile('./app/views/index.html', content, function(err) {
            next(err)
        })
    }
}

function createDirectories(list, callback) {
    async.forEachSeries(list, createDirectory, function(err, results) {
        callback((err) ? false : true)
    })

    function createDirectory(name, next) {
        fs.mkdir(name, 0755, function(e) {
            if (e) {
                console.error('Error while creating', name)
                next(e)
            } else {
                console.warn(' - Created directory:', name)
                next()
            }
        })
    }
}

function checkIfAppDirectoryExists(callback) {
    return fs.existsSync('./app')
}