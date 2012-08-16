#!/usr/bin/env node

var fs = require('fs'),
    async = require('async')

var args = require('optimist').argv._

if (args[0] == 'start') {
    if (checkIfAppDirectoryExists()) {
        require('.').start()
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
    callback()
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