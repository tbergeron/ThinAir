var fs = require('fs'),
    path = require('path'),
    configFile = path.join(process.cwd(), '/config.js')

// If there's no config file, use defaults.
if (fs.existsSync(configFile)) {
    console.log('Found config file! Using it...')
    require(configFile)
} else {
    // Environment [ DEV | PROD ]
    process.env.ENVIRONMENT = 'DEV';

    // Application Port
    process.env.PORT = 9000;
}

// if using DEV use console-trace for console.log by default
if (process.env.ENVIRONMENT === 'DEV') {
    require('console-trace')({ always: true })
}

var server = require('./libs/server'),
    sockets = require('./libs/sockets'),
    nCore = require('./node_modules/ncore/modules/core'),
    pd = require('pd'),
    ThinAir = require('./libs/thinair')

var nCoreStart = pd.extend(Object.create(ThinAir), {
    start: function(callback) {
        nCore({
            uri: __dirname,
            dependencyMapper: {
                uri: __dirname,
                jsonUri: path.join(__dirname, "libs", ((process.env.CALLED_FROM_TESTS) ? "dependencies_test.json" : "dependencies.json"))
            }
        }, function(err) {
            if (err) {
                console.error('Error starting nCore:', err)
                process.exit(0);
            } else {
                if (process.env.CALLED_FROM_TESTS) {
                    console.log('callback?')
                    callback()
                } else {
                    var serverInstance = server.startServer()

                    // socket.io initialization
                    sockets.initialize(serverInstance)
                }
            }
        })
    }
})

module.exports = nCoreStart